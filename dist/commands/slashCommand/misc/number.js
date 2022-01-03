"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberCommand = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const export_1 = require("../../../util/export");
const numberLang = language_json_1.default.commands.number;
class NumberCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'number',
            category: 'Misc',
            // type: '', //* Default type is SLASH_COMMAND
            description: numberLang.description.desc,
            usage: numberLang.description.usage,
            examples: numberLang.description.exemples,
            options: [
                {
                    type: 'NUMBER',
                    name: 'nbval',
                    description: numberLang.slashOptions.nbval.description,
                    autocomplete: false,
                    required: true,
                },
                {
                    type: 'NUMBER',
                    name: 'plage',
                    description: numberLang.slashOptions.plage.description,
                    autocomplete: false,
                    required: true,
                },
            ],
            defaultPermission: true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            // adminsOnly : , //* Default value is false 
            // userPermissions : [],
            // clientPermissions : []
        });
    }
    execute(interaction) {
        const nbval = interaction.options.getNumber('nbval');
        const plage = interaction.options.getNumber('plage');
        if (nbval > plage) {
            return interaction.reply({
                content: numberLang.messageError,
                ephemeral: true
            });
        }
        let result = new Array();
        let nb;
        for (let i = 0; i < nbval; i++) {
            do {
                nb = Math.floor(Math.random() * (plage - 1 + 1) + 1);
            } while (result.includes(nb));
            result.push(nb);
        }
        result.sort((a, b) => {
            return a - b;
        });
        let embed = (0, export_1.DefaultEmbed)();
        embed.title = `Voici la liste de${nbval === 1 ? '' : 's'} nombre${nbval === 1 ? '' : 's'} allant de **1 à ${plage}**`;
        embed.fields.push({ name: `${nbval === 1 ? 'La valeur' : 'Liste des valeurs'}`, value: result.join(','), inline: true });
        return interaction.reply({
            embeds: [embed]
        });
    }
}
exports.NumberCommand = NumberCommand;
