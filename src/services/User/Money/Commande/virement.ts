import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
    ApplicationCommandOptionType,
    CommandInteraction,
    GuildMember,
} from 'discord.js';
import lang from '../../../../tools/language.json';
import MoneyController from '../../../../APIToUserApi/MoneyController';
const cmdLang = lang.commands.virement;


export class VirementCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'virement',
            category: '', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
                {
                    type: ApplicationCommandOptionType.User,
                    name: 'utilisateur',
                    description: cmdLang.slashOptions.optionName,
                    required: true,
                },
                {
                    type: ApplicationCommandOptionType.Number,
                    name: 'somme',
                    description: cmdLang.slashOptions.optionName,
                    required: true,
                    min_value:1
                },
            ],
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly: true, //* Default value is false
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    async execute(i: CommandInteraction) {
        this.client.emit('CommandLog', i);

       try {
        await i.deferReply();

        const memberHaveMoney: GuildMember = i.member as GuildMember; 
        const memberToSendMoney: GuildMember = i.options.getMember('utilisateur') as GuildMember;
        const moneyToSend: number = i.options.get('somme', true).value as number;

        await MoneyController.removeMoney(memberHaveMoney.id, moneyToSend,false)
        .then(async (result)=> {
            const moneyDTO = result.data;
            
            await MoneyController.addMoney(memberToSendMoney.id, moneyToSend)
            .then(async (res) => {
                const moneyDTO2 = res.data;
                i.editReply(`<@${memberHaveMoney.id}> a envoyé ${moneyToSend}€ à <@${memberToSendMoney.id}>. Il lui reste ${moneyDTO.money}€ et <@${memberToSendMoney.id}> a maintenant ${moneyDTO2.money}€`);
            })
        })
        .catch((err) => {
            if (err.response.data == "Not Enough Money") {

                i.editReply(`<@${memberHaveMoney.id}> n'a pas assez d'argent pour envoyer ${moneyToSend}€ à <@${memberToSendMoney.id}>`);	
            }
        });
        } catch (error) {
                console.log(error);
                await i.reply(lang.bot.errorMessage);
			return this.client.emit('ErrorCommandLog', i, error);
        }

    }
}
