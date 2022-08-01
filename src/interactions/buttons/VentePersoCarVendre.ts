// import { Button } from "sheweny";
// import type { ShewenyClient } from "sheweny";
// import { ButtonInteraction, GuildMember, Message, MessageActionRow, MessageSelectMenu, MessageSelectOptionData } from "discord.js";
// import {MessageEmbed} from "discord.js"
// import lang from "../../util/language.json"
// import appConfig from '../../util/appConfig.json'
// import { IsEmbedOwner } from "../../util/export";
// const interactionLang = lang.intercation.button.VentePersoCar

// export class VentePersoCarVendreBtn extends Button {
//     constructor(client: ShewenyClient) {
//         super(client, ["VentePersoCarMenuVendre"]);
//     }

//     async execute(button: ButtonInteraction) {
//         const message = button.message as Message
//         const messageEmbed = message.embeds[0] as MessageEmbed
//         const member = button.member as GuildMember

//         // check if member can user button
//         if (!IsEmbedOwner(member,messageEmbed)){
//             return button.reply({
//                 content:interactionLang.button.cantUse,
//                 ephemeral:true,
//             })
//         }

//         let memberList : Array<MessageSelectOptionData> = new Array()
//         member.guild.roles.cache.get(appConfig.Roles.INSCRIT)!.members.filter(m => m.displayName != member.displayName).forEach((m) => memberList.push(JSON.parse(`{"label":"${m.displayName}","value":"${m.user.tag}"}`) as MessageSelectOptionData))

//         const carMenu = new MessageActionRow()
//         .addComponents(
//             new MessageSelectMenu()
//                 .setCustomId('VentePersoCarMenuVendreUser')
//                 .setPlaceholder(interactionLang.select.placeholder)
//                 .setMaxValues(1)
//                 .addOptions(memberList)
//         )
//         return button.update({components : [carMenu]})
//     }
// }