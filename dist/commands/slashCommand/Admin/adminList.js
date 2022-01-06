"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListCommand = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../../../util/export");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const appConfig_json_1 = __importDefault(require("../../../util/appConfig.json"));
const language_json_1 = __importDefault(require("../../../util/language.json"));
const cmdLang = language_json_1.default.commands.adminlist;
class AdminListCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'adminlist',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
                {
                    type: 'STRING',
                    name: 'add',
                    description: cmdLang.slashOptions.add,
                    autocomplete: true,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'remove',
                    description: cmdLang.slashOptions.remove,
                    autocomplete: true,
                    required: false,
                }
            ],
            defaultPermission: true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly: true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    execute(interaction) {
        this.client.emit('CommandLog', interaction);
        if (interaction.member.user.id !== appConfig_json_1.default.botConfig.dercrakerId) {
            return interaction.reply({
                content: cmdLang.interaction.notOwnerError,
                ephemeral: true
            });
        }
        let adminList = new Array();
        const adminRole = interaction.guild.roles.cache.get(appConfig_json_1.default.Roles.ADMIN);
        if (interaction.options.getString('add') == null && interaction.options.getString('remove') == null) {
            const adminRoleList = interaction.guild.roles.cache.get(appConfig_json_1.default.Roles.ADMIN).members.filter(u => appConfig_json_1.default.botConfig.admins.includes(u.id));
            adminRoleList.forEach(u => {
                adminList.push(u.nickname == null ? u.user.username : u.nickname);
            });
            let adminListEmbed = (0, export_1.DefaultEmbed)()
                .addField(cmdLang.embed.adminListField, adminList.join(' , '));
            return interaction.reply({
                embeds: [adminListEmbed],
                ephemeral: true
            });
        }
        else if (interaction.options.getString('add') != null && interaction.options.getString('remove') == null) {
            interaction.guild.members.cache.forEach(u => {
                if (u.user.username === interaction.options.getString('add') || u.nickname === interaction.options.getString('add')) {
                    if (u.id === appConfig_json_1.default.botConfig.dercrakerId) {
                        return interaction.reply({
                            content: cmdLang.interaction.notManagableUser,
                            ephemeral: true
                        });
                    }
                    u.roles.add(adminRole);
                    appConfig_json_1.default.botConfig.admins.push(u.id);
                    fs_1.default.writeFile(path_1.default.join(__dirname, '../../../util/appConfig.json'), JSON.stringify(appConfig_json_1.default), function writeJSON(err) {
                        if (err)
                            return console.log(err);
                    });
                    return interaction.reply({
                        content: cmdLang.interaction.addUser.format(u.nickname == null ? u.user.username : u.nickname),
                        ephemeral: true
                    });
                }
            });
        }
        else if (interaction.options.getString('add') == null && interaction.options.getString('remove') != null) {
            interaction.guild.roles.cache.get(appConfig_json_1.default.Roles.ADMIN).members.forEach(u => {
                if (appConfig_json_1.default.botConfig.admins.includes(u.id) && u.user.username === interaction.options.getString('remove') || u.nickname === interaction.options.getString('remove')) {
                    if (u.id === appConfig_json_1.default.botConfig.dercrakerId) {
                        return interaction.reply({ content: cmdLang.interaction.notManagableUser,
                            ephemeral: true });
                    }
                    u.roles.remove(adminRole);
                    appConfig_json_1.default.botConfig.admins = appConfig_json_1.default.botConfig.admins.filter(id => id !== u.id);
                    fs_1.default.writeFile(path_1.default.join(__dirname, '../../../util/appConfig.json'), JSON.stringify(appConfig_json_1.default), function writeJSON(err) {
                        if (err)
                            return console.log(err);
                    });
                    return interaction.reply({
                        content: cmdLang.interaction.removeUser.format(u.nickname == null ? u.user.username : u.nickname),
                        ephemeral: true
                    });
                }
            });
        }
        else {
            return interaction.reply({
                content: cmdLang.interaction.dualOptions,
                ephemeral: true
            });
        }
    }
    onAutocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices = new Array();
        if (focusedOption.name === "add") {
            interaction.guild.members.cache.forEach(user => {
                if (!user.roles.cache.map(r => r.id).includes(appConfig_json_1.default.Roles.ADMIN) && !choices.includes(user.user.username) && user.id != appConfig_json_1.default.botConfig.dercrakerId) {
                    choices.push(user.nickname == null ? user.user.username : user.nickname);
                }
            });
        }
        if (focusedOption.name === "remove") {
            interaction.guild.members.cache.forEach(user => {
                if (user.roles.cache.map(r => r.id).includes(appConfig_json_1.default.Roles.ADMIN) && !choices.includes(user.user.username) && user.id != appConfig_json_1.default.botConfig.dercrakerId) {
                    choices.push(user.nickname == null ? user.user.username : user.nickname);
                }
            });
        }
        const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
        interaction
            .respond(filtered.map((choice) => ({ name: choice, value: choice })));
    }
}
exports.AdminListCommand = AdminListCommand;
