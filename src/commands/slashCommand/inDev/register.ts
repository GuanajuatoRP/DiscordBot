import { DefaultEmbed } from './../../../util/export';
import { Command } from 'sheweny'
import type { ShewenyClient } from 'sheweny'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ColorResolvable, CommandInteraction } from 'discord.js'
import lang from '../../../util/language.json'
import RegisterController from '../../../APIToUserApi/RegisterController';
import { StatusCodes } from 'http-status-codes';
const cmdLang = lang.commands.register



export class RegisterCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'register',
      // category: 'Misc', //* Default category is InDev
      // type: '', //* Default type is SLASH_COMMAND
      description: cmdLang.description.desc,
      usage: cmdLang.description.usage,
      examples: cmdLang.description.exemples,
      options: [
      ],
      // channel : '', //* Default Channel is GUILD
      // cooldown : , //* Default cooldown set at 2sec
      adminsOnly: true, //* Default value is false 
      //userPermissions : [],
      //clientPermissions : []
    });
  }
  async execute(interaction: CommandInteraction) {
    this.client.emit('CommandLog', interaction as CommandInteraction)
    await interaction.deferReply()

    let httpcode: StatusCodes = StatusCodes.OK;
    await RegisterController.UserExist(interaction.user.id)
      .then(res => {
        httpcode = res.status == 200 ? StatusCodes.OK : StatusCodes.NO_CONTENT
      })

    if (httpcode == StatusCodes.OK) {
      return interaction.editReply({
        content: cmdLang.interaction.alreadyRegister.content,
      })
    }


    let embed = DefaultEmbed()
    embed.data.title = cmdLang.embed.title
    embed.setColor(cmdLang.embed.color as ColorResolvable)
    embed.addFields({ name: cmdLang.embed.Fields[0].name, value: cmdLang.embed.Fields[0].value, inline: true })

    const btNewAccount = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('Register')
          .setLabel(cmdLang.bouton.label)
          .setStyle(ButtonStyle.Primary)
      )

    return interaction.editReply({
      components: [btNewAccount],
    })
  }
}