"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCommand = void 0;
const sheweny_1 = require("sheweny");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const appConfig_json_1 = __importDefault(require("../../../util/appConfig.json"));
const language_json_1 = __importDefault(require("../../../util/language.json"));
const gameLang = language_json_1.default.commands.game;
class GameCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'game',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: gameLang.description.desc,
            usage: gameLang.description.usage,
            examples: gameLang.description.exemples,
            options: [
                {
                    type: 'STRING',
                    name: 'game_name',
                    description: gameLang.menu.Placeholder,
                    autocomplete: true,
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
        const rawData = fs.readFileSync(path.join(__dirname, '../../../util/channelGame.json')).toString();
        const channels = JSON.parse(rawData);
        channels[interaction.options.getString('game_name')].forEach((salon) => {
            interaction.guild.channels.create(salon.name, {
                "type": salon.channelInfo.type,
            })
                .then((channel) => {
                channel.setParent(appConfig_json_1.default.chanels.game.categorie);
                channel.permissionOverwrites.set(salon.channelInfo.permissionOverwrites);
                switch (channel.type) {
                    case 'GUILD_TEXT':
                        salon.messages.forEach((el) => {
                            const obj = el[1];
                            if (obj.content) {
                                channel.send({
                                    content: `${obj.content}`,
                                    embeds: obj.embeds,
                                    components: obj.components,
                                    mentions: obj.mentions
                                }).then((newMessage) => {
                                    if (obj.pinned)
                                        newMessage.pin();
                                });
                            }
                            else {
                                channel.send({
                                    embeds: obj.embeds,
                                    components: obj.components,
                                    mentions: obj.mentions
                                }).then((newMessage) => {
                                    if (obj.pinned)
                                        newMessage.pin();
                                });
                            }
                        });
                        break;
                    case 'GUILD_VOICE':
                        channel.edit({
                            position: salon.channelInfo.position,
                            userLimit: salon.channelInfo.userLimit,
                        });
                        break;
                }
            });
        });
        interaction.reply({
            content: `Tous les salons pour le mode de jeux \*\*${interaction.options.getString('game_name')}\*\* ont été créé`,
            ephemeral: true,
        });
    }
    onAutocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices = new Array();
        const rawData = fs.readFileSync(path.join(__dirname, '../../../util/channelGame.json')).toString();
        const channels = JSON.parse(rawData);
        Object.keys(channels).forEach(key => {
            choices.push(key);
        });
        if (focusedOption.name === 'game_name') {
            choices;
        }
        const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
        interaction
            .respond(filtered.map((choice) => ({ name: choice, value: choice })));
    }
}
exports.GameCommand = GameCommand;
