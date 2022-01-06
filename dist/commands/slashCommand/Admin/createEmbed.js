"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmbedCommand = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../../../util/export");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import appConf from '../../../util/appConfig.json'
const language_json_1 = __importDefault(require("../../../util/language.json"));
const cmdLang = language_json_1.default.commands.createembed;
class CreateEmbedCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'createembed',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
                {
                    type: 'BOOLEAN',
                    name: 'display',
                    description: cmdLang.Options.Display.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'color',
                    description: cmdLang.Options.SetColor.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'title',
                    description: cmdLang.Options.SetTitle.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'url',
                    description: cmdLang.Options.SetUrl.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'description',
                    description: cmdLang.Options.SetDesc.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'image',
                    description: cmdLang.Options.SetImage.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'STRING',
                    name: 'thumbnail',
                    description: cmdLang.Options.SetThumbnail.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'BOOLEAN',
                    name: 'add_field',
                    description: cmdLang.Options.AddField.description,
                    autocomplete: false,
                    required: false,
                },
                {
                    type: 'CHANNEL',
                    name: 'send',
                    description: cmdLang.Options.SendEmbed.description,
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
            const embed = (0, export_1.DefaultEmbed)();
            (0, export_1.saveEmbed)(embed);
            return interaction.reply({
                content: cmdLang.interaction.newEmbed,
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
                            content: cmdLang.Options.AddField.description,
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
                                content: cmdLang.Options.SendEmbed.errorType,
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
                content: cmdLang.interaction.multypleOptions,
                ephemeral: true
            });
        }
    }
}
exports.CreateEmbedCommand = CreateEmbedCommand;
