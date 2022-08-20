// import { IsEmbedOwner } from './../../Util/export';
// import { Button } from "sheweny";
// import type { ShewenyClient } from "sheweny";
// import type { ButtonInteraction, ColorResolvable, GuildMember, Message } from "discord.js";
// import lang from "../../Tools/language.json"
// const interactionLang = lang.intercation.button.ImmatriculationBuy

// export class ImmatriculationBuyBtn extends Button {
//     constructor(client: ShewenyClient) {
//         super(client, ["ImmatriculationBuy"]);
//     }

//     execute(button: ButtonInteraction) {
//         const message = button.message as Message;
//         const member = button.member as GuildMember;
//         const embedMessage = message.embeds[0];

//         if (!IsEmbedOwner(member,embedMessage)){
//             return button.reply({
//                 content: interactionLang.button.cantUse,
//                 ephemeral : true
//             })
//         }

//         let embed = embedMessage
//         embed.setFields(embedMessage.fields[1])
//         embed.setColor(interactionLang.embed.color as ColorResolvable)
//         embed.setDescription(interactionLang.embed.description)
//         message.react('✅')

//         // TODO faire les Call api  et transfère d'argent

//         return  button.update({embeds : [embed],components:[]})
//     }
// }
