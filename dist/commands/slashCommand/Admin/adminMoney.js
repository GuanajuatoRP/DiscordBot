"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMoneyCommand = void 0;
const discord_js_1 = require("discord.js");
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const MoneyController_1 = __importDefault(require("../../../APIToUserApi/MoneyController"));
const CommandLang = language_json_1.default.commands.adminMoney;
class AdminMoneyCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'adminmoney',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: CommandLang.description.desc,
            usage: CommandLang.description.usage,
            examples: CommandLang.description.exemples,
            options: [
                {
                    type: discord_js_1.ApplicationCommandOptionType.User,
                    name: 'user',
                    description: CommandLang.slashOptions.user,
                    required: true,
                },
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: 'action',
                    description: CommandLang.slashOptions.action,
                    required: true,
                    choices: [
                        { name: "Add", value: "Add", },
                        { name: "Remove", value: "Remove" },
                        { name: "Set", value: "Set" }
                    ],
                },
                {
                    type: discord_js_1.ApplicationCommandOptionType.Number,
                    name: 'montant',
                    description: CommandLang.slashOptions.amount,
                    required: true
                },
                {
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    name: 'raison',
                    description: CommandLang.slashOptions.reason,
                    required: true
                },
            ],
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly: true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    async execute(interaction) {
        this.client.emit('CommandLog', interaction);
        await interaction.deferReply();
        const user = interaction.options.get('user').member;
        const action = interaction.options.get('action').value;
        const montant = interaction.options.get('montant').value;
        const raison = interaction.options.get('raison').value;
        let embedMoney = new discord_js_1.EmbedBuilder()
            .setTitle(CommandLang.embed.title.format(user.displayName))
            .setThumbnail(interaction.member.displayAvatarURL())
            .setAuthor({ name: "𝑳𝒂 𝒃𝒂𝒏𝒒𝒖𝒆", url: "https://discord.com/channels/854140376867930122/1001952467786932244/1002182894632050708", })
            .setTimestamp()
            .setFooter({ text: `Motif : ${raison}` });
        try {
            switch (action) {
                case "Add":
                    await MoneyController_1.default.addMoney(user.id, montant)
                        .then(response => {
                        const moneyDTO = response.data;
                        embedMoney.setColor("#11ff00");
                        embedMoney.addFields({
                            name: CommandLang.embed.fieldsNames.add,
                            value: `${montant}€`,
                        }, {
                            name: CommandLang.embed.fieldsNames.newSolde,
                            value: `${moneyDTO.money}€`,
                        });
                    });
                    break;
                case "Remove":
                    await MoneyController_1.default.removeMoney(user.id, montant)
                        .then(response => {
                        const moneyDTO = response.data;
                        embedMoney.setColor("#f00");
                        embedMoney.addFields({
                            name: CommandLang.embed.fieldsNames.remove,
                            value: `${montant}€`,
                        }, {
                            name: CommandLang.embed.fieldsNames.newSolde,
                            value: `${moneyDTO.money}€`,
                        });
                    });
                    break;
                case "Set":
                    await MoneyController_1.default.setMoney(user.id, montant)
                        .then(response => {
                        const moneyDTO = response.data;
                        embedMoney.setColor("#FFA500");
                        embedMoney.addFields({
                            name: CommandLang.embed.fieldsNames.set,
                            value: `${moneyDTO.money}€`,
                        });
                    });
                    break;
            }
        }
        catch (error) {
            return interaction.editReply({
                content: language_json_1.default.bot.errorMessage,
            });
        }
        return interaction.editReply({
            embeds: [embedMoney],
        });
    }
}
exports.AdminMoneyCommand = AdminMoneyCommand;
