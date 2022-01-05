"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const pingLang = language_json_1.default.commands.ping;
class PingCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: "ping",
            category: 'Dev',
            // type: '', //* Default type is SLASH_COMMAND
            description: pingLang.description.desc,
            usage: pingLang.description.usage,
            examples: pingLang.description.exemples,
            options: [
            // {   type : 'STRING',
            // name: 'commande',
            // description: '',
            // autocomplete : false,
            // required : false,
            // choices : []}
            ],
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            // adminsOnly : , //* Default value is false 
            defaultPermission: true,
            userPermissions: [],
            clientPermissions: []
        });
    }
    execute(interaction) {
        this.client.emit('CommandLog', interaction);
        const start = Date.now();
        interaction.reply({ content: "Pong !" }).then(() => {
            const end = Date.now();
            const time = end - start;
            interaction.editReply({ content: `Pong : ${time}ms` });
        });
    }
}
exports.PingCommand = PingCommand;
