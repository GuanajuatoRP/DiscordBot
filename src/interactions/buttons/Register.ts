import { DefaultEmbed } from './../../util/export';
import { Button } from "sheweny"
import type { ShewenyClient } from "sheweny"
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, GuildMember, GuildMemberRoleManager, Role } from "discord.js"
import appConf from '../../util/appConfig.json'
import lang from "../../util/language.json"
import RegisterController from '../../APIToUserApi/RegisterController';
import { StatusCodes } from "http-status-codes"
const interactionLang = lang.intercation.button.register
export class RegisterBtn extends Button {
  constructor(client: ShewenyClient) {
    super(client, ["Register"]);
  }

  async execute(button: ButtonInteraction) {
    // Get Member and this roles
    const member = button.member as GuildMember
    const memberRoles = member.roles as GuildMemberRoleManager
    const RoleInscrit = button.guild!.roles.cache.get(appConf.Roles.INSCRIT) as Role

    // Check if this user is already registred
    let httpcode: StatusCodes = StatusCodes.OK;
    await RegisterController.UserExist(member.id)
      .then(res => {
        httpcode = res.status == 200 ? StatusCodes.OK : StatusCodes.NO_CONTENT
      })

    if (memberRoles.cache.has(appConf.Roles.INSCRIT) == true || httpcode == StatusCodes.OK) {
      memberRoles.add(RoleInscrit)
      return button.reply({
        content: interactionLang.AlreadyRegistred,
        ephemeral: true
      })
    }


    // const trycatch = true
    // const registerModel: RegisterModel = { discordId: member.id }
    //TODO :  Call Api on register endpoint to create a new token with user.id

    // if (trycatch) {
    // Create new embed and button link to send in dm on member 
    let embed = DefaultEmbed()
    embed.setDescription(interactionLang.embedGoodResponse.description)

    const btLink = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setLabel(interactionLang.button.label)
          .setStyle(ButtonStyle.Link)
          .setURL(appConf.Api.RegisterLink.format(member.id))
      )

    // Explain at member the futur new DM
    await button.reply({
      content: interactionLang.buttonReply.content,
      ephemeral: true,
    })

    // After 2Sec send DM
    return setTimeout(() => {
      member.send({
        embeds: [embed],
        components: [btLink]
      })
    }, 2000)

    //TODO: LogsEmbed

    // }
    // else {
    //   // Create Embed With Error Informations
    //   let embed = LogsEmbed(member.displayName, member.id)
    //   embed.setAuthor({ name: interactionLang.embedError.author })
    //   embed.setDescription(interactionLang.embedError.description)
    //   embed.addFields({ name: interactionLang.embedError.field.Err.name, value: "err.message" },
    //     { name: interactionLang.embedError.field.ErrMess.name, value: "err.response.data.message" })

    //   // Get the channel named LogBot and send Embed into this channel
    //   const logBotChannel = button.guild!.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel
    //   await logBotChannel.send({
    //     embeds: [embed]
    //   })

    //   // Send lambda Error Message to user
    //   return button.reply({
    //     content: interactionLang.buttonReply2.content,
    //     ephemeral: true
    //   })
    // }
  }
}
