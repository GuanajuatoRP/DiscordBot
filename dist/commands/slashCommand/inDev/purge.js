"use strict";
// import { Command } from 'sheweny'
// import type { ShewenyClient } from 'sheweny'
// import { CommandInteraction} from 'discord.js'
// import lang from '../../../util/language.json'
// const cmdLang = lang.commands.purge
// export class PurgeCommand extends Command {
//     constructor(client: ShewenyClient) {
//         super(client, {
//             name: 'purge',
//             category: 'Admin', //* Default category is InDev
//             // type: '', //* Default type is SLASH_COMMAND
//             description: cmdLang.description.desc,
//             usage : cmdLang.description.usage,
//             examples : cmdLang.description.exemples,
//             options : [
//                 {
//                     type : 'NUMBER',
//                     name: 'nombre',
//                     description: cmdLang.slashOptions.nombre.description,
//                     autocomplete : false,
//                     required : true,
//                 }
//             ],
//             defaultPermission : true,
//             // channel : '', //* Default Channel is GUILD
//             // cooldown : , //* Default cooldown set at 2sec
//             adminsOnly : true, //* Default value is false 
//             //userPermissions : [],
//             //clientPermissions : []
//         });
//     }
//     async execute(interaction : CommandInteraction) {
//         this.client.emit('CommandLog', interaction as CommandInteraction)
//         if (interaction.options.getNumber('nombre')! > 100 ) {
//             return interaction.reply({
//                 content : cmdLang.messageError.maxNumber,
//                 ephemeral: true,
//             })
//         }
//         const nombre : number = interaction.options.getNumber('nombre') == null ? 100 : interaction.options.getNumber('nombre')!
//         let messages = await interaction.channel!.messages.fetch({
//             limit: nombre,
//             before: interaction.id
//         })
//         messages = messages.filter(message => message.pinned === false)
//         try {
//             const channel = interaction.channel!
//             if (channel.type === 'DM') return
//             await channel.bulkDelete(messages)
//         } catch (error) {
//             return interaction.reply({
//                 content: cmdLang.messageError.maxDays,
//                 ephemeral: true,
//             })
//         }
//         return interaction.reply({
//             content: cmdLang.interaction.content,
//             ephemeral: true,
//         })
//     }
// }
