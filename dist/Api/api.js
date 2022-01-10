"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
const express_1 = __importDefault(require("express"));
const UserValidatedModel_1 = require("../Api/Model/UserValidatedModel");
const index_1 = require("../index");
const appConfig_json_2 = __importDefault(require("../util/appConfig.json"));
const language_json_1 = __importDefault(require("../util/language.json"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// Check if the user with {{userId}}
exports.app.get("/isUserOnServer/:userId", async (req, res) => {
    const guild = await index_1.client.guilds.fetch(appConfig_json_1.default.botConfig.guildid);
    let result = false;
    await guild.members.fetch(req.params.userId)
        .then((user) => {
        result = true;
        console.log(language_json_1.default.api.isUserOnServer.true.format(req.params.userId, user.displayName));
    })
        .catch((reason) => {
        result = false;
        console.log(reason);
        console.log(language_json_1.default.api.isUserOnServer.false.format(req.params.userId));
    });
    res.send(result);
});
exports.app.post("/test", async (req, res) => {
    const guild = await index_1.client.guilds.fetch(appConfig_json_1.default.botConfig.guildid);
    const channel = await guild.channels.cache.get('902244087258828872');
    channel.send(req.body.message);
    res.send(req.body.message);
});
exports.app.post("/uservalidated", async (req, res) => {
    const user = new UserValidatedModel_1.userValidateModel();
    user.userId = req.body.userId;
    user.token = req.body.token;
    // get guild
    const guild = await index_1.client.guilds.fetch(appConfig_json_1.default.botConfig.guildid);
    // set new role
    const member = guild.members.cache.get(user.userId);
    member.roles.add(member.guild.roles.cache.get(appConfig_json_2.default.Roles.INSCRIT));
    //log in channel
    const channel = await guild.channels.cache.get(appConfig_json_2.default.chanels.staff.botLog);
    channel.send(language_json_1.default.api.uservalidated.registered.format(req.body.userId));
    res.sendStatus(200);
});
