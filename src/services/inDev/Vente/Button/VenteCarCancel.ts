// import { Button } from "sheweny";
// import type { ShewenyClient } from "sheweny";
// import type { ButtonInteraction,  GuildMember, Message } from "discord.js";
// import {MessageEmbed} from "discord.js"
// import { IsEmbedOwner } from "../../Util/export";
// import lang from "../../tools/language.json"
// const interactionLang = lang.intercation.button.VenteCarCancel

// export class VenteCarCancelBtn extends Button {
//     constructor(client: ShewenyClient) {
//         super(client, ["VenteCarCancel"]);
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

//         message.delete()

//         return button.reply({
//             content:interactionLang.interaction.content,
//             ephemeral : true
//         })
//     }
// }
