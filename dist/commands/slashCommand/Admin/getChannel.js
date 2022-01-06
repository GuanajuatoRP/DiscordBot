"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetChannelCommand = void 0;
const sheweny_1 = require("sheweny");
const fs_1 = __importDefault(require("fs"));
const export_1 = require("../../../util/export");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const cmdLang = language_json_1.default.commands.getchannel;
class GetChannelCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'getchannel',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
                {
                    type: 'CHANNEL',
                    name: 'category',
                    description: 'Nom de la catégorie a save',
                    autocomplete: false,
                    required: true,
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
        let salon = Object.create(export_1.ChannelObject);
        let permissions;
        let permissionsList = new Array();
        switch (interaction.options.data[0].channel.type) {
            case 'GUILD_TEXT':
                const textChannel = interaction.options.data[0].channel;
                permissions = [...textChannel.permissionOverwrites.cache];
                permissions.forEach(permission => {
                    permissionsList.push(permission[1]);
                });
                salon.channelInfo = {
                    "type": textChannel.type,
                    "topic": textChannel.topic,
                    "permissionOverwrites": permissionsList,
                    "position": textChannel.position
                };
                textChannel.messages.fetch()
                    .then(msg => {
                    const messageTab = [...msg].reverse();
                    salon.messages = messageTab;
                    fs_1.default.appendFile('cat.json', `${JSON.stringify(salon)},`, (err) => {
                        if (err)
                            throw err;
                    });
                });
                break;
            case 'GUILD_VOICE':
                const voiceChannel = interaction.options.data[0].channel;
                permissions = [...voiceChannel.permissionOverwrites.cache];
                permissions.forEach(permission => {
                    permissionsList.push(permission[1]);
                });
                salon.channelInfo = {
                    "type": voiceChannel.type,
                    "permissionOverwrites": permissionsList,
                    "position": voiceChannel.rawPosition,
                    "userLimit": voiceChannel.userLimit,
                };
                fs_1.default.appendFile('cat.json', `${JSON.stringify(salon)},`, (err) => {
                    if (err)
                        throw err;
                });
                break;
        }
        return interaction.reply({
            content: 'getchannel',
            ephemeral: true
        });
    }
}
exports.GetChannelCommand = GetChannelCommand;
