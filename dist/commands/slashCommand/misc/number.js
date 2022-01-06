"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberCommand = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const export_1 = require("../../../util/export");
const cmdLang = language_json_1.default.commands.number;
class NumberCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'number',
            category: 'Misc',
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
                {
                    type: 'NUMBER',
                    name: 'nbval',
                    description: cmdLang.slashOptions.nbval.description,
                    autocomplete: false,
                    required: true,
                },
                {
                    type: 'NUMBER',
                    name: 'plage',
                    description: cmdLang.slashOptions.plage.description,
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
        this.client.emit('CommandLog', interaction);
        const nbval = interaction.options.getNumber('nbval');
        const plage = interaction.options.getNumber('plage');
        if (nbval > plage) {
            return interaction.reply({
                content: cmdLang.messageError,
                ephemeral: true
            });
        }
        let result = new Array();
        let nb;
        for (let i = 0; i < nbval; i++) {
            do {
                //Get random number between 1 and max (plage)
                nb = Math.floor(Math.random() * (plage - 1 + 1) + 1);
            } while (result.includes(nb));
            result.push(nb);
        }
        result.sort((a, b) => {
            return a - b;
        });
        let embed = (0, export_1.DefaultEmbed)();
        embed.title = ``.format(nbval === 1 ? '' : 's', plage.toString());
        embed.fields.push({ name: `${nbval === 1 ? 'La valeur' : 'Liste des valeurs'}`, value: result.join(','), inline: true });
        return interaction.reply({
            embeds: [embed]
        });
    }
}
exports.NumberCommand = NumberCommand;
