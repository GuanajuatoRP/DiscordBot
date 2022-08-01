// import { Button } from "sheweny";
// import type { ShewenyClient } from "sheweny";
// import type { ButtonInteraction, ColorResolvable, GuildMember, Message } from "discord.js";
// import {MessageEmbed} from "discord.js"
// import lang from "../../util/language.json"
// import { IsEmbedOwner } from "../../util/export";
// const interactionLang = lang.intercation.button.VenteProCar.Vendre

// export class VenteProCarVendreBtn extends Button {
//     constructor(client: ShewenyClient) {
//         super(client, ["VenteProCarMenuVendre"]);
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

//         let Newembed = messageEmbed
//             .setTitle(interactionLang.embed.title)
//             .setColor(interactionLang.embed.color as ColorResolvable)
//             .setThumbnail(member.displayAvatarURL())
//             .addFields(
//                 {name : interactionLang.embed.fields.Vente.name.format(member.displayName),value: interactionLang.embed.fields.Vente.value.format("1000"), inline:true}
//             )
//         message.react('✅')

//         // TODO Call API Vendre la voiture et faire la transaction
        
//         return await button.update({embeds : [Newembed],components : []})
//     }
// }