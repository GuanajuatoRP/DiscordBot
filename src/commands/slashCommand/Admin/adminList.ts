import { Command } from 'sheweny'
import { DefaultEmbed } from '../../../util/export'
import fs from 'fs'
import path from 'path'
import type { ShewenyClient } from 'sheweny'
import type { AutocompleteInteraction, CommandInteraction } from 'discord.js'
import appConfig from '../../../util/appConfig.json'
import lang from '../../../util/language.json'
const adminListLang = lang.commands.adminlist



export class AdminListCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'adminlist',
            category: 'Admin', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: adminListLang.description.desc,
            usage : adminListLang.description.usage,
            examples : adminListLang.description.exemples,
            options : [
                {
                    type : 'STRING',
                    name: 'add',
                    description: adminListLang.slashOptions.add,
                    autocomplete : true,
                    required : false,
                    },
                {
                    type : 'STRING',
                    name: 'remove',
                    description: adminListLang.slashOptions.remove,
                    autocomplete : true,
                    required : false,
                    }
            ],
            defaultPermission : true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly : true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    execute(interaction : CommandInteraction) {
        this.client.emit('CommandLog', interaction as CommandInteraction)

        if (interaction.member.user.id !== appConfig.botConfig.dercrakerId){
            return interaction.reply({
                content : adminListLang.interaction.notOwnerError,
                ephemeral : true
            })
        }

        let adminList : Array<any> = new Array<any>()
        const adminRole = interaction.guild!.roles.cache.get(appConfig.Roles.ADMIN);
        if (interaction.options.getString('add') == null && interaction.options.getString('remove') == null){
            const adminRoleList = interaction.guild!.roles.cache.get(appConfig.Roles.ADMIN)!.members.filter(u => appConfig.botConfig.admins.includes(u.id))

            adminRoleList.forEach(u => {
                adminList.push(u.nickname == null ? u.user.username : u.nickname)
            });
            let adminListEmbed = DefaultEmbed()
                .addField(adminListLang.embed.adminListField, adminList.join(' , '))

            return interaction.reply({
                embeds : [adminListEmbed],
                ephemeral : true
            })
        } else if (interaction.options.getString('add') != null && interaction.options.getString('remove') == null){
            interaction.guild!.members.cache.forEach(u => {
                if (u.user.username === interaction.options.getString('add') || u.nickname === interaction.options.getString('add')){
                    if (u.id === appConfig.botConfig.dercrakerId){
                        return interaction.reply({
                            content : adminListLang.interaction.notManagableUser,
                            ephemeral: true
                    })
                    }
                    u.roles.add(adminRole!)
                    appConfig.botConfig.admins.push(u.id)

                    fs.writeFile(path.join(__dirname, '../../../util/appConfig.json'), JSON.stringify(appConfig), function writeJSON(err) {
                        if (err) return console.log(err);
                    })

                    return interaction.reply({
                        content : `L'utilisateur **${u.nickname == null ? u.user.username : u.nickname}** a bien été ajouté de la liste des administrateurs`,
                        ephemeral : true
                    }) 
                }
            })
        } else if (interaction.options.getString('add') == null && interaction.options.getString('remove') != null){
            interaction.guild!.roles.cache.get(appConfig.Roles.ADMIN)!.members.forEach(u => {
                if (appConfig.botConfig.admins.includes(u.id) && u.user.username === interaction.options.getString('remove') || u.nickname === interaction.options.getString('remove')){
                    if (u.id === appConfig.botConfig.dercrakerId){
                        return interaction.reply({content : adminListLang.interaction.notManagableUser,
                        ephemeral : true})
                    }
                    u.roles.remove(adminRole!)
                    appConfig.botConfig.admins = appConfig.botConfig.admins.filter(id => id !== u.id);

                    fs.writeFile(path.join(__dirname, '../../../util/appConfig.json'), JSON.stringify(appConfig), function writeJSON(err) {
                        if (err) return console.log(err);
                    })

                    return interaction.reply({
                        content : `L'utilisateur **${u.nickname == null ? u.user.username : u.nickname}** a bien été retiré de la liste des administrateurs`,
                        ephemeral : true
                    }) 
                }
            })
        } else {
            return interaction.reply({
                content : 'Vous ne pouvez pas ajouté et suprimer des utilisateurs en même temp',
                ephemeral : true
            }) 
        }
    }
    onAutocomplete(interaction: AutocompleteInteraction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices : Array<any> = new Array<any>()
    
        if (focusedOption.name === "add") {
            interaction.guild!.members.cache.forEach(user => {
                if (!user.roles.cache.map(r => r.id).includes(appConfig.Roles.ADMIN) && !choices.includes(user.user.username) && user.id != appConfig.botConfig.dercrakerId){
                    choices.push(user.nickname == null ? user.user.username : user.nickname)
                }
            });
        }
    
        if (focusedOption.name === "remove") {
            interaction.guild!.members.cache.forEach(user => {
                if (user.roles.cache.map(r => r.id).includes(appConfig.Roles.ADMIN) && !choices.includes(user.user.username) && user.id != appConfig.botConfig.dercrakerId){
                    choices.push(user.nickname == null ? user.user.username : user.nickname)
                }
            });
        }
    
        const filtered = choices!.filter((choice: any) =>
            choice.startsWith(focusedOption.value)
        );
        interaction
            .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
    }
}