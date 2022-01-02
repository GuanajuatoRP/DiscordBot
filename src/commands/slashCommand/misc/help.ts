import { Command } from "sheweny"
import {DefaultEmbed} from '../../../util/export'
import {stripIndents} from 'common-tags'
import type { ShewenyClient } from "sheweny"
import type { CommandInteraction, AutocompleteInteraction } from "discord.js"
import lang from '../../../util/language.json'
const Helplang = lang.commands.help

export class HelpCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'help',
            category: 'Misc', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: Helplang.description.desc,
            usage : Helplang.description.usage,
            examples : Helplang.description.exemples,
            options : [
                {   type : 'STRING',
                    name: 'commande',
                    description: Helplang.slashOptions.command.description,
                    autocomplete : true,
                }
            ],
            defaultPermission : true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            // adminsOnly : , //* Default value is false 
            userPermissions : [],
            clientPermissions : []
        });
    }
    execute(interaction : CommandInteraction) {
        let commandName = interaction.options

        let allCategory = new Array //Get All Unnique Catégory
        this.client.collections.commands.forEach(command => {
            if (!allCategory.includes(`${command.category}`) && command.category != 'InDev' && command.category != 'Admin') allCategory.push(`${command.category}`)
        });
        const commands = Array.from(this.client.util.getCommands()) //Get All Commands loaded for the bot 


        if (!commandName.get('commande')){
            let Embed = DefaultEmbed()
                .setDescription(lang.commands.help.description.desc)
                .addFields()

            for (const category of allCategory) {
                Embed.addField(
                        `${category}`,
                        `${commands.filter(c => c.category === `${category}` && c.adminsOnly === false && c.type === 'SLASH_COMMAND')
                                    .map(c => `\`${c.name}\``)
                                    .join(', ')}`
                )
            }
            
            Embed.addField(
                '------------',
                `**\`/help <command>\` pour des infos sur une commande spécifique **
                Exemples \`/help ping\`  || \`/help number\``
            )
            return interaction.reply({
                embeds: [Embed],
                ephemeral: true
            }) 
        } else if (commandName.get('commande')){
            const CName = `${commandName.get('commande')!.value}`
            const command = this.client.collections.commands.get(CName);
            
            if (!commands.map(c => c.name).includes(CName)){
                return interaction.reply({
                    content: `La commande ***${CName}***  n'existe pas`,
                    ephemeral : true
                }) 
            }
            if (command!.adminsOnly === true){
                return interaction.reply({
                    content: `La commande ***${CName}*** ne peut pas être lue depuis ce menu`
                }) 
            }

            return interaction.reply({
                content: stripIndents`
                \`\`\`makefile
                    [help : ${command!.name}]                       [Category : ${command!.category}]

                    ${command!.description}

                    Utilisation: /${command!.usage}
                    Exemple${Array.from(command!.examples!).length == 1 ? '' : 's'}: /${Array.from(command!.examples!).join(`, /`)}


                    <> = argument(s) optionnel(s) | {} = argument(s) obligatoire
                    Les caractères suivants -> <>, {} ne doivents pas être inclus dans les commandes
                \`\`\`               
                `,
                ephemeral : true
            }) 


        }
    }
    onAutocomplete(interaction: AutocompleteInteraction) {
        const focusedOption = interaction.options.getFocused(true);
    
        const choices: Array<string> = Array.from(this.client.util.getCommands()).filter(c => c.category !== `InDev` && c.adminsOnly === false && c.type === 'SLASH_COMMAND').map(c => c.name)

        
        if (focusedOption.name === "commande") {
            choices
        }
    
        const filtered = choices!.filter((choice: any) =>
            choice.startsWith(focusedOption.value)
        )
        interaction
            .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    }
}
