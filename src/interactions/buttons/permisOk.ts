// import { Button } from "sheweny";
// import type { ShewenyClient } from "sheweny";
// import type { ButtonInteraction, ColorResolvable, GuildMember, Message } from "discord.js";
// import {MessageEmbed} from "discord.js"
// import lang from "../../util/language.json"
// import { IsAdmin } from "../../util/export";
// const interactionLang = lang.intercation.button.PermisOk
// // import appConfig from '../../util/appConfig.json'

// export class PermisOkBtns extends Button {
//     constructor(client: ShewenyClient) {
//         super(client, ["PermisOk"]);
//     }

//     async execute(button: ButtonInteraction) {
//         const message = button.message as Message;
//         const member = button.member as GuildMember

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
//             embed.setThumbnail(member.displayAvatarURL())
//             // TODO : Faire une rquest api pour avoir la fiche personnel de l'utilisateur 
//             .addFields(
//                 {name : interactionLang.embed.fields.Prénom.name,value: "JeanJack", inline:true},
//                 {name : interactionLang.embed.fields.Nom.name,value: "GoldMan", inline:true},
//                 {name : interactionLang.embed.fields.Permis.name,value: button.message.embeds[0].fields![2].value, inline:false},
//                 {name : interactionLang.embed.fields.Pts.name,value: "12", inline:true}
//             )
//         message.react('✅')
//         await button.update({embeds : [embed],components : []})
//     }
// }