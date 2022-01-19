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
                    description: cmdLang.slashOptions.category,
                    autocomplete: false,
                    required: false,
                    channelTypes: ['GUILD_CATEGORY']
                },
                {
                    type: 'CHANNEL',
                    name: 'salon',
                    description: cmdLang.slashOptions.salon,
                    autocomplete: false,
                    required: false,
                    channelTypes: ['GUILD_VOICE', 'GUILD_TEXT', 'GUILD_STAGE_VOICE', 'GUILD_NEWS']
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
        if (interaction.options.data.length != 1) {
            return interaction.reply({
                content: cmdLang.interaction.needOptions,
                ephemeral: true
            });
        }
        this.client.emit('CommandLog', interaction);
        let channlesIds = new Array();
        switch (interaction.options.data[0].name) {
            case 'category':
                const catId = interaction.options.getChannel('category').id;
                channlesIds = (Array.from(interaction.guild.channels.cache.filter(c => c.parentId == catId && c.id != catId).map(c => c.id)));
                break;
            case 'salon':
                channlesIds.push(interaction.options.getChannel('salon').id);
                break;
        }
        channlesIds.forEach(id => {
            const channel = interaction.guild.channels.cache.filter(c => c.id == id);
            switch (channel.first().type) {
                case 'GUILD_TEXT':
                    let salon = new export_1.ChannelClass();
                    const textChannel = channel.map(c => c)[0];
                    salon.name = textChannel.name,
                        salon.channelInfo.type = 0 /* GUILD_TEXT */;
                    salon.channelInfo.topic = textChannel.type;
                    salon.channelInfo.permissionOverwrites = textChannel.permissionOverwrites.cache.toJSON();
                    salon.channelInfo.position = textChannel.position + 1;
                    console.log(salon.name + " " + salon.channelInfo.position);
                    textChannel.messages.fetch()
                        .then(msg => {
                        const messageTab = [...msg].reverse();
                        salon.messages = messageTab;
                        fs_1.default.appendFile('cat.json', `${JSON.stringify(salon)},\n`, (err) => {
                            if (err)
                                throw err;
                        });
                    });
                    break;
                case 'GUILD_VOICE':
                    let salonVocal = new export_1.ChannelClass();
                    const voiceChannel = channel.map(c => c)[0];
                    salonVocal.name = voiceChannel.name,
                        salonVocal.channelInfo.type = 2 /* GUILD_VOICE */;
                    salonVocal.channelInfo.permissionOverwrites = voiceChannel.permissionOverwrites.cache.toJSON();
                    salonVocal.channelInfo.position = voiceChannel.position;
                    salonVocal.channelInfo.userLimit = voiceChannel.userLimit;
                    fs_1.default.appendFile('cat.json', `${JSON.stringify(salonVocal)},\n`, (err) => {
                        if (err)
                            throw err;
                    });
                    break;
            }
        });
        return interaction.reply({
            content: cmdLang.interaction.content,
            ephemeral: true
        });
    }
    onAutocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices;
        if (focusedOption.name === "category") {
            choices = Array.from(interaction.guild.channels.cache.filter(c => c.type == 'GUILD_CATEGORY').map(c => c.name));
        }
        if (focusedOption.name === "salon") {
            choices = Array.from(interaction.guild.channels.cache.filter(c => c.type != 'GUILD_CATEGORY').map(c => c.name));
        }
        const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
        interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
    }
}
exports.GetChannelCommand = GetChannelCommand;
