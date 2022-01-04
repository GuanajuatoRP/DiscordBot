import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import { CommandInteraction} from 'discord.js'
import lang from '../../../util/language.json'
import { CommandLog } from '../../../util/export'
const purgeLang = lang.commands.purge



export class PurgeCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'purge',
            category: 'Admin', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: purgeLang.description.desc,
            usage : purgeLang.description.usage,
            examples : purgeLang.description.exemples,
            options : [
                {
                    type : 'NUMBER',
                    name: 'nombre',
                    description: purgeLang.slashOptions.nombre.description,
                    autocomplete : false,
                    required : true,
                }
            ],
            defaultPermission : true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly : true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    async execute(interaction : CommandInteraction) {
        CommandLog(interaction.guild!.members.cache.get(interaction.user.id)!,interaction)
        
        if (interaction.options.getNumber('nombre')! > 100 ) {
            return interaction.reply({
                content : purgeLang.messageError.maxNumber,
                ephemeral: true,
            })
        }
        const nombre : number = interaction.options.getNumber('nombre') == null ? 100 : interaction.options.getNumber('nombre')!
        let messages = await interaction.channel!.messages.fetch({
            limit: nombre,
            before: interaction.id
        })
        messages = messages.filter(message => message.pinned === false)
        try {
            const channel = interaction.channel!
            if (channel.type === 'DM') return
            await channel.bulkDelete(messages)
        } catch (error) {
            return interaction.reply({
                content: purgeLang.messageError.maxDays,
                ephemeral: true,
            })
        }
        return interaction.reply({
            content: purgeLang.interaction.content,
            ephemeral: true,
        })
    }
    // onAutocomplete(interaction: AutocompleteInteraction) {
    //     const focusedOption = interaction.options.getFocused(true);
    
    //     const choices: Array<string> = Array.from(this.client.util.getCommands()).filter(c => c.category !== `InDev` && c.adminsOnly === false && c.type === 'SLASH_COMMAND').map(c => c.name)
    
    //     if (focusedOption.name === 'commande') {
    //         choices
    //     }
    
    //     const filtered = choices!.filter((choice: any) =>
    //         choice.startsWith(focusedOption.value)
    //     )
    //     interaction
    //         .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    // }
}