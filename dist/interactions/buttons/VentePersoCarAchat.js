"use strict";
// import { Button } from "sheweny";
// import type { ShewenyClient } from "sheweny";
// import { ButtonInteraction, ColorResolvable, GuildMember, Message} from "discord.js";
// import {MessageEmbed} from "discord.js"
// import lang from "../../util/language.json"
// // import appConfig from '../../util/appConfig.json'
// const interactionLang = lang.intercation.button.AchatPersoCar
// export class VentePersoCarAchatBtn extends Button {
//     constructor(client: ShewenyClient) {
//         super(client, ["VentePersoCarMenuAchat"]);
//     }
//     execute(button: ButtonInteraction) {
//         const member = button.member as GuildMember
//         const message = button.message as Message
//         const messageEmbed = message.embeds[0] as MessageEmbed
//         // check if member can user button
//         if (!messageEmbed.description!.split(' : ')[1].includes(member.user.tag)){
//             return button.reply({
//                 content:interactionLang.button.cantUse,
//                 ephemeral:true,
//             })
//         }
//         let Newembed = messageEmbed
//             // .setTitle(messageEmbed.title as string)
//             .setDescription(interactionLang.embed.description as string)
//             .setColor(interactionLang.embed.color as ColorResolvable)
//             .setThumbnail(member.displayAvatarURL())
//             .addFields(
//                 {name : interactionLang.embed.fields.Vente.name.format(member.displayName),value: interactionLang.embed.fields.Vente.value.format("1000"), inline:true}
//             )
//         message.react('✅')
//         //TODO faire les transaction et les call API
//         button.update({
//             embeds:[Newembed],
//             components:[]
//         })
//     }
// }
