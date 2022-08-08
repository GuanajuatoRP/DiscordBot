"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCommand = void 0;
const export_1 = require("./../../../util/export");
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const RegisterController_1 = __importDefault(require("../../../APIToUserApi/RegisterController"));
const http_status_codes_1 = require("http-status-codes");
const cmdLang = language_json_1.default.commands.register;
class RegisterCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'register',
            // category: 'Misc', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [],
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
        let httpcode = http_status_codes_1.StatusCodes.OK;
        await RegisterController_1.default.UserExist(interaction.user.id)
            .then(res => {
            httpcode = res.status == 200 ? http_status_codes_1.StatusCodes.OK : http_status_codes_1.StatusCodes.NO_CONTENT;
        });
        if (httpcode == http_status_codes_1.StatusCodes.OK) {
            return interaction.editReply({
                content: cmdLang.interaction.alreadyRegister.content,
            });
        }
        let embed = (0, export_1.DefaultEmbed)();
        embed.data.title = cmdLang.embed.title;
        embed.setColor(cmdLang.embed.color);
        embed.addFields({ name: cmdLang.embed.Fields[0].name, value: cmdLang.embed.Fields[0].value, inline: true });
        const btNewAccount = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('Register')
            .setLabel(cmdLang.bouton.label)
            .setStyle(discord_js_1.ButtonStyle.Primary));
        return interaction.editReply({
            components: [btNewAccount],
        });
    }
}
exports.RegisterCommand = RegisterCommand;
