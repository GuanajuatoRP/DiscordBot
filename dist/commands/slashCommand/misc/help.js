"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../../../util/export");
const common_tags_1 = require("common-tags");
const discord_js_1 = require("discord.js");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const cmdLang = language_json_1.default.commands.help;
class HelpCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'help',
            category: 'Misc',
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
                { type: discord_js_1.ApplicationCommandOptionType.String,
                    name: 'commande',
                    description: cmdLang.slashOptions.command.description,
                    autocomplete: true,
                }
            ],
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            // adminsOnly : , //* Default value is false 
            userPermissions: [],
            clientPermissions: []
        });
    }
    execute(interaction) {
        this.client.emit('CommandLog', interaction);
        let commandName = interaction.options;
        let allCategory = new Array; //Get All Unnique Catégory
        this.client.collections.commands.map(c => c[0]).forEach(command => {
            // Filter all catégory without InDev and Admin
            if (!allCategory.includes(`${command.category}`) && command.category != 'InDev' && command.category != 'Admin')
                allCategory.push(`${command.category}`);
        });
        const commands = this.client.collections.commands.map(c => c[0]); //Get All Commands loaded for the bot 
        if (!commandName.get('commande')) {
            let Embed = (0, export_1.DefaultEmbed)()
                .setDescription(language_json_1.default.commands.help.description.desc);
            for (const category of allCategory) {
                Embed.addFields({
                    name: `${category}`,
                    value: `${commands.filter(c => c.category === `${category}` && c.adminsOnly === false && c.type === 'SLASH_COMMAND')
                        .map(c => `\`${c.name}\``)
                        .join(', ')}`
                });
            }
            // Define random command for /help example
            let availableCommand = commands.filter(c => c.category != 'InDev' && c.category != 'Admin' && c.adminsOnly === false && c.type === 'SLASH_COMMAND').map(c => c.name);
            let randomCommand1;
            let randomCommand2;
            do {
                randomCommand1 = availableCommand[Math.floor(Math.random() * availableCommand.length)];
                randomCommand2 = availableCommand[Math.floor(Math.random() * availableCommand.length)];
            } while (randomCommand1 == randomCommand2);
            Embed.addFields({
                name: cmdLang.genericEmbed.fields.info.name,
                value: cmdLang.genericEmbed.fields.info.value.format(randomCommand1, randomCommand2)
            });
            return interaction.reply({
                embeds: [Embed],
                ephemeral: false
            });
        }
        else if (commandName.get('commande')) {
            const CName = `${commandName.get('commande').value}`;
            const command = this.client.collections.commands.get(CName);
            if (!commands.map(c => c.name).includes(CName)) {
                return interaction.reply({
                    content: cmdLang.interaction.wrongName.format(CName),
                    ephemeral: false
                });
            }
            if (command[0].adminsOnly === true) {
                return interaction.reply({
                    content: cmdLang.interaction.noRead.format(CName),
                    ephemeral: false
                });
            }
            return interaction.reply({
                content: (0, common_tags_1.stripIndents) `
                \`\`\`makefile
                    [help : ${command[0].name}]                       [Category : ${command[0].category}]

                    ${command[0].description}

                    Utilisation: /${command[0].usage}
                    Exemple${Array.from(command[0].examples).length == 1 ? '' : 's'}: /${Array.from(command[0].examples).join(`, /`)}


                    <> = argument(s) optionnel(s) | {} = argument(s) obligatoire
                    Les caractères suivants -> <>, {} ne doivents pas être inclus dans les commandes
                \`\`\`               
                `,
                ephemeral: false
            });
        }
    }
    onAutocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        const choices = this.client.collections.commands.map(c => c[0]).filter(c => c.category != `InDev` && c.adminsOnly == false && c.type == 'SLASH_COMMAND').map(c => c.name);
        if (focusedOption.name === "commande") {
            choices;
        }
        const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
        interaction
            .respond(filtered.map((choice) => ({ name: choice, value: choice })));
    }
}
exports.HelpCommand = HelpCommand;
