// import { IsAdmin } from './../../util/export';
// import { Button } from "sheweny";
// import type { ShewenyClient } from "sheweny";
// import type { ButtonInteraction, ColorResolvable, GuildMember, Message } from "discord.js";
// import {MessageEmbed} from "discord.js"
// import lang from "../../tools/language.json"
// const interactionLang = lang.intercation.button.PermisFail
// // import appConfig from '../../util/appConfig.json'

// export class PermisFailBtns extends Button {
//     constructor(client: ShewenyClient) {
//         super(client, ["PermisFail"]);
//     }

//     async execute(button: ButtonInteraction) {
//         const message = button.message as Message;
//         const member = button.member as GuildMember;

//         if (!IsAdmin(member)){
//             button.reply({
//                 content: `Il semblerais que tu ne fasse pas partis du staff, tu ne peut donc pas faire ceci`,
//                 ephemeral : true
//             })
//         }

//         let embed = new MessageEmbed()
//             embed.setColor(interactionLang.embed.color as ColorResolvable)
//             embed.setTitle(interactionLang.embed.title)
//             embed.setDescription(interactionLang.embed.description)
//             embed.setFooter(interactionLang.embed.footer.format(member.user.tag))
//             embed.setTimestamp()
//         message.react('❌')
//         await button.update({embeds : [embed],components : []})
//     }
// }
