"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
const language_json_1 = __importDefault(require("../util/language.json"));
const UserOnServerModel_1 = require("./Model/UserOnServerModel");
const UserValidatedModel_1 = require("./Model/UserValidatedModel");
const UserValidatedOnDBModel_1 = require("./Model/UserValidatedOnDBModel");
const export_1 = require("../util/export");
const cors = require('cors');
exports.app = (0, express_1.default)();
function rawBody(req, res, next) {
    req.setEncoding('utf8');
    req.rawBody = '';
    req.on('data', function (chunk) {
        req.rawBody += chunk;
    });
    req.on('end', function () {
        next();
    });
}
exports.app.use(rawBody);
exports.app.use(cors({ origin: '*' }));
// Check if the user with {{userId}}
exports.app.get("/isUserOnServer/:userId", async (req, res) => {
    const guild = await index_1.client.guilds.fetch(appConfig_json_1.default.botConfig.guildid);
    let userIsOnServer = new UserOnServerModel_1.UserOnServerModel();
    await guild.members.fetch(req.params.userId)
        .then((user) => {
        userIsOnServer.isOnServeur = true;
        userIsOnServer.username = user.displayName;
    })
        .catch((reason) => {
        userIsOnServer.isOnServeur = false;
    });
    res.send(userIsOnServer);
});
exports.app.post("/test", async (req, res) => {
    const guild = await index_1.client.guilds.fetch(appConfig_json_1.default.botConfig.guildid);
    const channel = await guild.channels.cache.get('1001952449252298792');
    channel.send(req.rawBody);
    res.send(req.rawBody);
});
// Check if user on serveur and send on users are on the server dm with validation button and a message
exports.app.post("/sendRegisterValidationButton/:userId", async (req, res) => {
    //Get params
    const user = new UserValidatedModel_1.UserValidatedModel();
    user.userId = req.params.userId;
    const jsonBody = JSON.parse(req.rawBody);
    user.token = jsonBody.token;
    // get guild
    const guild = await index_1.client.guilds.fetch(appConfig_json_1.default.botConfig.guildid);
    let result = false;
    await guild.members.fetch(user.userId)
        .then((user) => {
        result = true;
    })
        .catch((reason) => {
        result = false;
    });
    if (!result)
        return res.status(400).send("L'utilisateur n'est pas sur le serveur");
    // get member on guild
    const member = guild.members.cache.get(user.userId);
    let embed = (0, export_1.DefaultEmbed)();
    embed.setColor(language_json_1.default.embeds.ActivateRegistration.color);
    embed.setDescription(language_json_1.default.embeds.ActivateRegistration.description);
    // Create button and message for validation 
    const btRegisterValidation = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.ButtonBuilder()
        .setURL(appConfig_json_1.default.Api.RegisterValidationLink.format(user.userId, user.token))
        .setLabel("Valider l'inscription")
        .setStyle(discord_js_1.ButtonStyle.Link));
    // Send Button and Message in user's DM
    member.user.send({ embeds: [embed], components: [btRegisterValidation] });
    res.sendStatus(200);
});
// Add Role to user after db validation
exports.app.post("/UserValidatedOnDBModel/:userId", async (req, res) => {
    //Get params
    const user = new UserValidatedOnDBModel_1.UserValidatedOnDBModel();
    const jsonBody = JSON.parse(req.rawBody);
    user.userId = jsonBody.userId;
    user.discordId = jsonBody.discordId;
    if (user.userId != req.params.userId)
        return res.status(400).send("Les id ne correspondent pas");
    // get guild
    const guild = await index_1.client.guilds.fetch(appConfig_json_1.default.botConfig.guildid);
    let member = null;
    await guild.members.fetch(user.discordId)
        .then((user) => {
        member = user;
    })
        .catch((reason) => {
        return res.status(400).send("L'utilisateur n'est pas sur le serveur");
    });
    // get member on guild
    //get roles
    const role = await guild.roles.fetch(appConfig_json_1.default.Roles.INSCRIT);
    //Add role to user
    member.roles.add(role, "Inscription validée");
    // send Log
    let embed = new discord_js_1.EmbedBuilder()
        .setColor(language_json_1.default.embeds.AccountActivated.color)
        .setAuthor({ name: "[+] {0}".format(member.user.tag) })
        .setDescription(language_json_1.default.embeds.AccountActivated.description.format(member.displayName))
        .setFooter({ text: "GuildMember Account Activated" })
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL());
    const channel = member.guild.channels.cache.get(appConfig_json_1.default.chanels.staff.serverLog);
    channel.send({
        embeds: [embed]
    });
    res.sendStatus(200);
});
