"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterBtn = void 0;
const export_1 = require("./../../util/export");
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
const appConfig_json_1 = __importDefault(require("../../util/appConfig.json"));
const language_json_1 = __importDefault(require("../../util/language.json"));
const RegisterController_1 = __importDefault(require("../../APIToUserApi/RegisterController"));
const http_status_codes_1 = require("http-status-codes");
const interactionLang = language_json_1.default.intercation.button.register;
class RegisterBtn extends sheweny_1.Button {
    constructor(client) {
        super(client, ["Register"]);
    }
    async execute(button) {
        // Get Member and this roles
        const member = button.member;
        const memberRoles = member.roles;
        const RoleInscrit = button.guild.roles.cache.get(appConfig_json_1.default.Roles.INSCRIT);
        // Check if this user is already registred
        let httpcode = http_status_codes_1.StatusCodes.OK;
        await RegisterController_1.default.UserExist(member.id)
            .then(res => {
            httpcode = res.status == 200 ? http_status_codes_1.StatusCodes.OK : http_status_codes_1.StatusCodes.NO_CONTENT;
        });
        if (memberRoles.cache.has(appConfig_json_1.default.Roles.INSCRIT) == true || httpcode == http_status_codes_1.StatusCodes.OK) {
            memberRoles.add(RoleInscrit);
            return button.reply({
                content: interactionLang.AlreadyRegistred,
                ephemeral: true
            });
        }
        // Create new embed and button link to send in dm on member 
        let embed = (0, export_1.DefaultEmbed)();
        embed.setDescription(interactionLang.embedGoodResponse.description);
        const btLink = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel(interactionLang.button.label)
            .setStyle(discord_js_1.ButtonStyle.Link)
            .setURL(appConfig_json_1.default.Api.RegisterLink.format(member.id)));
        // Explain at member the futur new DM
        await button.reply({
            content: interactionLang.buttonReply.content,
            ephemeral: true,
        });
        // After 2Sec send DM
        return setTimeout(() => {
            member.send({
                embeds: [embed],
                components: [btLink]
            });
        }, 2000);
    }
}
exports.RegisterBtn = RegisterBtn;
