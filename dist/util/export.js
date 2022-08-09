"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewImmatriculation = exports.IsEmbedOwner = exports.IsAdmin = exports.PermisTypes = exports.ChannelInfo = exports.ChannelClass = exports.LogsEmbed = exports.DefaultEmbed = exports.saveEmbed = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const language_json_1 = __importDefault(require("./language.json"));
const appConfig_json_1 = __importDefault(require("../util/appConfig.json"));
const __1 = require("..");
//* Permet de save un embed Pour la commande créate embed
const saveEmbed = (embed) => {
    fs_1.default.writeFile(path_1.default.join(__dirname, './customEmbed.json'), JSON.stringify(embed), function writeJSON(err) {
        if (err)
            return console.log(err);
    });
};
exports.saveEmbed = saveEmbed;
//* Embed par def 
const DefaultEmbed = () => {
    return new discord_js_1.EmbedBuilder()
        .setAuthor({ name: language_json_1.default.embeds.default.author, iconURL: "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", url: "https://discord.gg/BtkWVH2Kq9" })
        .setColor('#ff8000')
        .setFooter({ text: language_json_1.default.embeds.default.footer, iconURL: "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg" })
        .setTimestamp()
        .addFields();
};
exports.DefaultEmbed = DefaultEmbed;
//* Embed utilisé pour logger
const LogsEmbed = (name, id) => {
    return new discord_js_1.EmbedBuilder()
        .setAuthor({ name: language_json_1.default.embeds.LogsEmbed.author })
        .setColor('#ff0000')
        .setTimestamp()
        .setFooter({ text: language_json_1.default.embeds.LogsEmbed.footer.format(name, id) })
        .addFields();
};
exports.LogsEmbed = LogsEmbed;
//* est utilisée a la save de channelles avec la command /getcategory
class ChannelClass {
    constructor() {
        this.name = '';
        this.channelInfo = new ChannelInfo();
        this.messages = [];
    }
}
exports.ChannelClass = ChannelClass;
class ChannelInfo {
    constructor() {
        this.type = 0 || 2;
        this.topic = '';
        this.permissionOverwrites = [];
        this.position = 0;
        this.userLimit = 0;
    }
}
exports.ChannelInfo = ChannelInfo;
//* format method for String type
// String.prototype.format(arg,arg,...)
// formatter like String.format in c#
//* '{0}anyString{1}'.format(var1,var2) == 'var1anyStringvar2'
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        // regex to find '{d}' with digit match to index args.
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
//* Autocomplete /inscription
var PermisTypes;
(function (PermisTypes) {
    PermisTypes["Probatoire"] = "Probatoire";
    PermisTypes["D\u00E9finitif"] = "D\u00E9finitif";
    PermisTypes["Stage_B"] = "Stage_B";
    PermisTypes["Stage_A"] = "Stage_A";
    PermisTypes["Stage_S1"] = "Stage_S1";
    PermisTypes["Stage_S2"] = "Stage_S2";
})(PermisTypes = exports.PermisTypes || (exports.PermisTypes = {}));
//* Permet de définir si un GuildMember est admin ou non
const IsAdmin = (member) => {
    // Check if the GuildMember have Admin role or he's id are in admin's id table
    return (!member.roles.cache.has(appConfig_json_1.default.Roles.ADMIN) || !__1.client.admins.includes(member.id)) ? false : true;
};
exports.IsAdmin = IsAdmin;
//* Permet de déterminer si un GuildMember est concerner par un embed
//! Ne fonctionne que si il y a "xxx : GuildMember.tag" dans le footer et rien d'autre 
const IsEmbedOwner = (member, embed) => {
    const embedMember = embed.data.footer.text.split(' : ')[1];
    // if the GuildMember are and admin he can use embed
    if ((0, exports.IsAdmin)(member)) {
        return true;
    }
    // Check if the GuildMember tag is in emùbed footer 
    return (!embedMember.includes(member.user.tag)) ? false : true;
};
exports.IsEmbedOwner = IsEmbedOwner;
const NewImmatriculation = (immat, immatLenght) => {
    // Todo Call API get Full ImmatList on server 
    const immatList = ["00-aaa-00", "20-qsd-45"];
    if (immat != "" && immatList.includes(immat)) {
        return language_json_1.default.commands.immatriculation.export.exist;
    }
    else if (immat != "" && immat.length != immatLenght) {
        return language_json_1.default.commands.immatriculation.export.len;
    }
    if (immat == "") {
        do {
            for (let i = 0; i < 2; i++) {
                immat += Math.floor(Math.random() * (9 + 1));
            }
            immat += "-";
            for (let i = 0; i < 3; i++) {
                immat += String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
            }
            immat += "-";
            for (let i = 0; i < 2; i++) {
                immat += Math.floor(Math.random() * (9 + 1));
            }
        } while (immatList.includes(immat));
    }
    return immat;
};
exports.NewImmatriculation = NewImmatriculation;
