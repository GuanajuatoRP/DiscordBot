"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCommandLogsCommand = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const getcommandlogsLang = language_json_1.default.commands.getcommandlogs;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class GetCommandLogsCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'getcommandlogs',
            // category: 'dev', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: getcommandlogsLang.description.desc,
            usage: getcommandlogsLang.description.usage,
            examples: getcommandlogsLang.description.exemples,
            options: [
                {
                    type: 'STRING',
                    name: 'file-date',
                    description: getcommandlogsLang.slashOptions.description,
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
        const DateList = fs_1.default.readdirSync(path_1.default.join(__dirname, '../../../util/logs')).map(date => date.slice(11, -4));
        if (!DateList.includes(interaction.options.getString('file-date'))) {
            return interaction.reply({
                content: 'La date ne correspond a aucune des dates disponibles vérifi le template qui doit être dd-mm-yyyy',
                ephemeral: true
            });
        }
        return interaction.reply({
            content: `Voici le fichier de CommandLogs qui correspond a la date du ${interaction.options.getString('file-date')}`,
            files: [path_1.default.join(__dirname, `../../../util/logs/commandLog_${interaction.options.getString('file-date')}.txt`)],
            ephemeral: true
        });
    }
    onAutocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices;
        if (focusedOption.name === "file-date") {
            choices = fs_1.default.readdirSync(path_1.default.join(__dirname, '../../../util/logs')).map(date => date.slice(11, -4));
        }
        const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
        interaction
            .respond(filtered.map((choice) => ({ name: choice, value: choice })));
    }
}
exports.GetCommandLogsCommand = GetCommandLogsCommand;
