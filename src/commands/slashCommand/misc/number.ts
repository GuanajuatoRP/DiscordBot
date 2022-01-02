import { Command } from "sheweny"
import type { ShewenyClient } from "sheweny"
import type { CommandInteraction } from "discord.js"
import lang from '../../../util/language.json'
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
        return interaction.reply(`Voici ${nbval === 1 ? 'la':'vos'} valeur${nbval === 1 ? '':'s'}: ${result.join(',')}`);
    }
}
