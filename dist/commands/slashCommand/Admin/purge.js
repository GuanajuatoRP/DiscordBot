"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurgeCommand = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const purgeLang = language_json_1.default.commands.purge;
class PurgeCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: purgeLang.description.desc,
            usage: purgeLang.description.usage,
            examples: purgeLang.description.exemples,
            options: [
                {
                    type: 'NUMBER',
                    name: 'nombre',
                    description: purgeLang.slashOptions.nombre.description,
                    autocomplete: false,
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
    async execute(interaction) {
        if (interaction.options.getNumber('nombre') > 100) {
            return interaction.reply({
                content: purgeLang.messageError.maxNumber,
                ephemeral: true,
            });
        }
        const nombre = interaction.options.getNumber('nombre') == null ? 100 : interaction.options.getNumber('nombre');
        let messages = await interaction.channel.messages.fetch({
            limit: nombre,
            before: interaction.id
        });
        messages = messages.filter(message => message.pinned === false);
        try {
            const channel = interaction.channel;
            if (channel.type === 'DM')
                return;
            await channel.bulkDelete(messages);
        }
        catch (error) {
            return interaction.reply({
                content: purgeLang.messageError.maxDays,
                ephemeral: true,
            });
        }
        return interaction.reply({
            content: purgeLang.interaction.content,
            ephemeral: true,
        });
    }
}
exports.PurgeCommand = PurgeCommand;
