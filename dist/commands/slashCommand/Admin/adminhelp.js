"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminHelpCommand = void 0;
const sheweny_1 = require("sheweny");
const export_1 = require("../../../util/export");
const common_tags_1 = require("common-tags");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const cmdLang = language_json_1.default.commands.adminhelp;
class AdminHelpCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'adminhelp',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
                { type: 'STRING',
                    name: 'commande',
                    description: cmdLang.slashOptions.description,
                    autocomplete: true,
                }
            ],
            defaultPermission: true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly: true, //* Default value is false 
            // userPermissions : [],
            // clientPermissions : []
        });
    }
    execute(interaction) {
        this.client.emit('AdminCommandLog', interaction);
        let commandName = interaction.options;
        const commands = Array.from(this.client.util.getCommands()); //Get All Commands loaded for the bot 
        if (!commandName.get('commande')) { //si aucune commande est donner en paramètre
            let allCategory = new Array; //Get All Unnique Catégory
            this.client.collections.commands.forEach(command => {
                if (command.category === 'InDev' || command.category === 'Admin') {
                    if (!allCategory.includes(command.category)) {
                        allCategory.push(command.category);
                    }
                }
            });
            let Embed = (0, export_1.DefaultEmbed)()
                .setColor('#FF0000')
                .setDescription(language_json_1.default.commands.help.description.desc);
            for (const category of allCategory) {
                const commandOfCategory = commands.filter(c => c.category === `${category}` && c.adminsOnly === true && c.type === 'SLASH_COMMAND').map(c => `\`${c.name}\``);
                if (commandOfCategory.length == 0)
                    commandOfCategory.push('No Command in this Category');
                Embed.addField(`${category}`, `${commands.filter(c => c.category === `${category}` && c.adminsOnly === true && c.type === 'SLASH_COMMAND')
                    .map(c => `\`${c.name}\``)
                    .join(', ')}`);
            }
            // Define random command for /help example
            let availableCommand = commands.filter(c => c.category == 'InDev' || c.category == 'Admin' && c.type === 'SLASH_COMMAND' && c.name != 'adminlist').map(c => c.name);
            let randomCommand1;
            let randomCommand2;
            do {
                randomCommand1 = availableCommand[Math.floor(Math.random() * availableCommand.length)];
                randomCommand2 = availableCommand[Math.floor(Math.random() * availableCommand.length)];
            } while (randomCommand1 == randomCommand2);
            Embed.addField(cmdLang.embed.fields.info.name, cmdLang.embed.fields.info.value.format(randomCommand1, randomCommand2));
            return interaction.reply({
                embeds: [Embed],
                ephemeral: true
            });
        }
        else if (commandName.get('commande')) { //si une commande est donner en paramètre
            const CName = `${commandName.get('commande').value}`; //récupération du nom 
            const command = this.client.collections.commands.get(CName); //récupération du nom 
            if (!commands.map(c => c.name).includes(CName)) {
                return interaction.reply({
                    content: cmdLang.interaction.wrongName.format(CName),
                    ephemeral: true
                });
            }
            if (command.adminsOnly === false) {
                return interaction.reply({
                    content: cmdLang.interaction.noRead.format(CName),
                    ephemeral: true
                });
            }
            return interaction.reply({
                content: (0, common_tags_1.stripIndents) `
                \`\`\`makefile
                    [AdminHelp : ${command.name}]                ⚠️⚠️!!! AdminOnly !!!⚠️⚠️
                    [Catégorie : ${command.category}]
                    ${command.description}

                    Utilisation: /${command.usage}
                    Exemple${Array.from(command.examples).length == 1 ? '' : 's'}: /${Array.from(command.examples).join(`, /`)}


                    <> = argument(s) optionnel(s) | {} = argument(s) obligatoire
                    Les caractères suivants -> <>, {} ne doivents pas être inclus dans les commandes
                \`\`\`               
                `,
                ephemeral: true
            });
        }
    }
    onAutocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        const choices = Array.from(this.client.util.getCommands()).filter(c => c.category == `InDev` || c.category == `Admin` && c.adminsOnly === true && c.type === 'SLASH_COMMAND').map(c => c.name);
        if (focusedOption.name === "commande") {
            choices;
        }
        const filtered = choices.filter((choice) => choice.startsWith(focusedOption.value));
        interaction
            .respond(filtered.map((choice) => ({ name: choice, value: choice })));
    }
}
exports.AdminHelpCommand = AdminHelpCommand;
