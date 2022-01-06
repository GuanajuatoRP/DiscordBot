"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelObject = exports.LogsEmbed = exports.DefaultEmbed = exports.saveEmbed = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const language_json_1 = __importDefault(require("./language.json"));
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
    return new discord_js_1.MessageEmbed().setAuthor(language_json_1.default.embeds.default.author, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", "https://discord.gg/BtkWVH2Kq9").setColor('#ff8000').setFooter(language_json_1.default.embeds.default.footer, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg").setTimestamp().addFields();
};
exports.DefaultEmbed = DefaultEmbed;
//* Embed utilisé pour logger
const LogsEmbed = (name, id) => {
    return new discord_js_1.MessageEmbed().setAuthor(language_json_1.default.embeds.LogsEmbed.author).setColor('#ff0000').setFooter(language_json_1.default.embeds.LogsEmbed.footer.format(name, id)).setTimestamp();
};
exports.LogsEmbed = LogsEmbed;
//* est utilise a la save de channelles avec la command /getcategory
exports.ChannelObject = {
    name: String,
    channelInfo: {
        type: String,
        topic: String,
        permissionsList: Array,
        position: Number,
        userLimit: Number
    },
    messages: Array
};
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
