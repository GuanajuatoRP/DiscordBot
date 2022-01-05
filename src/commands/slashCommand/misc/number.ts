import { Command } from "sheweny"
import type { ShewenyClient } from "sheweny"
import type { CommandInteraction } from "discord.js"
import lang from '../../../util/language.json'
import { DefaultEmbed } from "../../../util/export"
const numberLang = lang.commands.number

export class NumberCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'number',
            category: 'Misc', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: numberLang.description.desc,
            usage : numberLang.description.usage,
            examples : numberLang.description.exemples,
            options : [
                {
                    type : 'NUMBER',
                    name: 'nbval',
                    description: numberLang.slashOptions.nbval.description,
                    autocomplete : false,
                    required : true,
                },
                {
                    type : 'NUMBER',
                    name: 'plage',
                    description: numberLang.slashOptions.plage.description,
                    autocomplete : false,
                    required : true,
                },
            ],
            defaultPermission : true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            // adminsOnly : , //* Default value is false 
            // userPermissions : [],
            // clientPermissions : []
        });
    }
    execute(interaction : CommandInteraction) {
        this.client.emit('CommandLog', interaction as CommandInteraction)
        
        const nbval : number = interaction.options.getNumber('nbval')!
        const plage : number = interaction.options.getNumber('plage')!
        
        if (nbval > plage) {
            return interaction.reply({
                content: numberLang.messageError,
                ephemeral: true
            })
        }
        let result : Array<Number> = new Array<Number>();
        let nb : number
        for (let i = 0; i < nbval; i++) {
            do {
                nb = Math.floor(Math.random() * (plage - 1 + 1) + 1)
            } while (result.includes(nb));
            result.push(nb)
        }
        result.sort((a : any, b : any) => {
            return a - b;
        })
        let embed = DefaultEmbed()
            embed.title = `Voici la liste de${nbval === 1 ? '':'s'} nombre${nbval === 1 ? '':'s'} allant de **1 à ${plage}**`
            embed.fields.push({name: `${nbval === 1 ? 'La valeur':'Liste des valeurs'}`, value : result.join(','), inline : true})
        return interaction.reply({
            embeds: [embed]
        });
    }
}
