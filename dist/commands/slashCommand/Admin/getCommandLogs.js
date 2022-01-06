"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommandLogsCommand = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const cmdLang = language_json_1.default.commands.getcommandlogs;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class GetCommandLogsCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'getcommandlogs',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
                {
                    type: 'STRING',
                    name: 'file-date',
                    description: cmdLang.slashOptions.description,
                    autocomplete: true,
                    required: true,
                }
            ],
            defaultPermission: true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly: true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    execute(interaction) {
        this.client.emit('CommandLog', interaction);
        // check if de date put in the option is in the date list of txtlogger file
        const DateList = fs_1.default.readdirSync(path_1.default.join(__dirname, '../../../util/logs')).map(date => date.slice(-14, -4));
        if (!DateList.includes(interaction.options.getString('file-date'))) {
            return interaction.reply({
                content: cmdLang.interaction.dateError,
                ephemeral: true
            });
        }
        return interaction.reply({
            content: cmdLang.interaction.content.format(interaction.options.getString('file-date')),
            files: [path_1.default.join(__dirname, `../../../util/logs/commandLog_${interaction.options.getString('file-date')}.txt`),
                path_1.default.join(__dirname, `../../../util/logs/adminCommandLog_${interaction.options.getString('file-date')}.txt`)],
            ephemeral: true
        });
    }
    onAutocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices;
        if (focusedOption.name === "file-date") {
            choices = [...new Set(fs_1.default.readdirSync(path_1.default.join(__dirname, '../../../util/logs')).map(date => date.slice(-14, -4)))];
        }
        const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
        interaction
            .respond(filtered.map((choice) => ({ name: choice, value: choice })));
    }
}
exports.GetCommandLogsCommand = GetCommandLogsCommand;
