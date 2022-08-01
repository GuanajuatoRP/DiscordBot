import { GetMoneyDTO } from './../../../APIToUserApi/Models/GetMoneyDTO';
import { ColorResolvable } from 'discord.js';
import { EmbedBuilder, GuildMember, CommandInteraction } from 'discord.js';
import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import lang from '../../../util/language.json'
import MoneyController from '../../../APIToUserApi/MoneyController';
const CommandLang = lang.commands.money



export class MoneyCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'money',
            category: 'Misc', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: CommandLang.description.desc,
            usage : CommandLang.description.usage,
            examples : CommandLang.description.exemples,
            options : [
            ],
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            // adminsOnly : true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    async execute (interaction : CommandInteraction) {
      this.client.emit('CommandLog', interaction as CommandInteraction)

      await MoneyController.getMoney((interaction.member as GuildMember).id)
        .then(response => {
          const moneyDTO: GetMoneyDTO = response.data as GetMoneyDTO;

          const embedMoney = new EmbedBuilder()
          .setTitle(CommandLang.embed.title.format((interaction.member! as GuildMember).displayName))
          .setColor(CommandLang.embed.color as ColorResolvable)
          .addFields({
            name: CommandLang.embed.fields[0].name,
            value: `${moneyDTO.money.toString()}€`,
          })
          .setThumbnail((interaction.member! as GuildMember).displayAvatarURL() as string)
          .setAuthor({ name: CommandLang.embed.author.name, url: CommandLang.embed.author.url, })
          .setTimestamp()
          .setFooter({text: CommandLang.embed.footer})
  
          return interaction.reply({
            embeds: [embedMoney],
            ephemeral: false,
          }) 
          
        })
        .catch(err => {
          return interaction.reply({
            content: err.response.data,
            ephemeral: false,
          }) 
        })
    }
}