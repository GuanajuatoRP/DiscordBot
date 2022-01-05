"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmbedCommand = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../../../util/export");
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import appConf from '../../../util/appConfig.json'
const language_json_1 = __importDefault(require("../../../util/language.json"));
const commandLang = language_json_1.default.commands.createembed;
class CreateEmbedCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'createembed',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: commandLang.description.desc,
            usage: commandLang.description.usage,
            examples: commandLang.description.exemples,
            options: [
                {
                    type: 'BOOLEAN',
                    name: 'display',
                    description: commandLang.Options.Display.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'color',
                    description: commandLang.Options.SetColor.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'title',
                    description: commandLang.Options.SetTitle.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'url',
                    description: commandLang.Options.SetUrl.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'description',
                    description: commandLang.Options.SetDesc.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'image',
                    description: commandLang.Options.SetImage.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'thumbnail',
                    description: commandLang.Options.SetThumbnail.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'BOOLEAN',
                    name: 'add_field',
                    description: commandLang.Options.AddField.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'CHANNEL',
                    name: 'send',
                    description: commandLang.Options.SendEmbed.description,
                    autocomplete: false,
                    required: false,
                },
            ],
            defaultPermission: true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly: true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    async execute(interaction) {
        this.client.emit('CommandLog', interaction);
        if (interaction.options.data.length === 0) {
            const embed = new discord_js_1.MessageEmbed().setAuthor(language_json_1.default.embeds.default.author, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", "https://discord.gg/BtkWVH2Kq9").setTimestamp().addFields();
            (0, export_1.saveEmbed)(embed);
            return interaction.reply({
                content: commandLang.interaction.newEmbed,
                embeds: [embed],
                ephemeral: true
            });
        }
        else if (interaction.options.data.length === 1) {
            const embed = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../util/customEmbed.json')).toString());
            interaction.options.data.forEach(option => {
                switch (option.name) {
                    case 'display':
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    case 'color':
                        embed.color = option.value;
                        (0, export_1.saveEmbed)(embed);
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    case 'title':
                        embed.title = option.value;
                        (0, export_1.saveEmbed)(embed);
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    case 'url':
                        embed.url = option.value;
                        (0, export_1.saveEmbed)(embed);
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    case 'description':
                        embed.description = option.value;
                        (0, export_1.saveEmbed)(embed);
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    case 'image':
                        embed.image = { url: option.value };
                        (0, export_1.saveEmbed)(embed);
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    case 'thumbnail':
                        embed.thumbnail = { url: option.value };
                        (0, export_1.saveEmbed)(embed);
                        return interaction.reply({
                            embeds: [embed],
                            ephemeral: true
                        });
                    case 'add_field':
                        const collector = interaction.channel.createMessageCollector({ max: 4 });
                        interaction.reply({
                            content: commandLang.Options.AddField.description,
                            ephemeral: true
                        });
                        collector.on('end', async (collected) => {
                            const collect = collected.map(m => m.content);
                            // console.log(collect);
                            await embed.fields.push({
                                name: collect[1],
                                value: collect[2],
                                inline: (collect[3].toLowerCase() == "false" ? false : true)
                            });
                            (0, export_1.saveEmbed)(embed);
                            interaction.channel.send({
                                embeds: [embed]
                            });
                        });
                    case 'send':
                        if (option.channel.type !== 'GUILD_TEXT') {
                            return interaction.reply({
                                content: commandLang.Options.SendEmbed.errorType,
                                ephemeral: true
                            });
                        }
                        const channel = option.channel;
                        channel.send({
                            embeds: [embed]
                        });
                        console.log();
                        return interaction.reply({
                            content: `votre message a bien été envoyé dans le salon **${interaction.options.getChannel('send').name}**`,
                            ephemeral: true
                        });
                }
            });
        }
        else {
            return interaction.reply({
                content: commandLang.interaction.multypleOptions,
                ephemeral: true
            });
        }
    }
}
exports.CreateEmbedCommand = CreateEmbedCommand;
