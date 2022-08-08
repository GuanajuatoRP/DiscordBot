"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyCommand = void 0;
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const MoneyController_1 = __importDefault(require("../../../APIToUserApi/MoneyController"));
const CommandLang = language_json_1.default.commands.money;
class MoneyCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'money',
            category: 'Misc',
            // type: '', //* Default type is SLASH_COMMAND
            description: CommandLang.description.desc,
            usage: CommandLang.description.usage,
            examples: CommandLang.description.exemples,
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.User,
                    name: 'user',
                    description: CommandLang.slashOptions.User,
                }
            ],
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            // adminsOnly : true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    async execute(interaction) {
        this.client.emit('CommandLog', interaction);
        await interaction.deferReply();
        const wait = require('node:timers/promises').setTimeout;
        await wait(5000);
        const user = interaction.options.getUser('user');
        await MoneyController_1.default.getMoney(user ? user.id : interaction.member.id)
            .then((response) => {
            const moneyDTO = response.data;
            const embedMoney = new discord_js_2.EmbedBuilder()
                .setTitle(CommandLang.embed.title.format(interaction.member.displayName))
                .setColor(CommandLang.embed.color)
                .addFields({
                name: CommandLang.embed.fields[0].name,
                value: `${moneyDTO.money.toString()}€`,
            })
                .setThumbnail(interaction.member.displayAvatarURL())
                .setAuthor({ name: CommandLang.embed.author.name, url: CommandLang.embed.author.url, })
                .setTimestamp()
                .setFooter({ text: CommandLang.embed.footer });
            return interaction.editReply({
                embeds: [embedMoney],
            });
        })
            .catch(() => {
            return interaction.editReply({
                content: language_json_1.default.bot.errorMessage,
            });
        });
    }
}
exports.MoneyCommand = MoneyCommand;
