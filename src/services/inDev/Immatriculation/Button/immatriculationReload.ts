// import { IsEmbedOwner, NewImmatriculation } from './../../Util/export';
// import { Button } from "sheweny";
// import type { ShewenyClient } from "sheweny";
// import type { ButtonInteraction, GuildMember, Message } from "discord.js";
// import lang from "../../tools/language.json"
// const interactionLang = lang.intercation.button.ImmatriculationReload

// export class ImmatriculationReloadBtn extends Button {
//     constructor(client: ShewenyClient) {
//         super(client, ["ImmatriculationReload"]);
//     }

//     execute(button: ButtonInteraction) {
//         const message = button.message as Message;
//         const member = button.member as GuildMember;
//         const embedMessage = message.embeds[0]

//         if (!IsEmbedOwner(member,embedMessage)){
//             return button.reply({
//                 content: interactionLang.button.cantUse,
//                 ephemeral : true
//             })
//         }

//         let embed = embedMessage
//         embed.fields[1].value = NewImmatriculation("" as string,9)

//         return  button.update({embeds : [embed]})
//     }
// }
