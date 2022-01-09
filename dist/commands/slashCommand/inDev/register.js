"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCommand = void 0;
const export_1 = require("./../../../util/export");
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const cmdLang = language_json_1.default.commands.register;
class RegisterCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'register',
            // category: 'Misc', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
                {
                    type: 'STRING',
                    name: 'username',
                    description: 'Définis le nom du compte',
                    autocomplete: false,
                    required: false,
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
        // TODO: créé une requête dans le but de get la liste des user sur la bd puis check si userlist.include intercation.user
        const userAlreadyregister = false;
        if (userAlreadyregister) {
            return interaction.reply({
                content: cmdLang.interaction.alreadyRegister.content,
                ephemeral: true
            });
        }
        else {
            // TODO: API call pour request un token d'authentification
            const token = interaction.options.getString('username');
            let embed = (0, export_1.DefaultEmbed)();
            embed.title = cmdLang.embed.title;
            embed.color = cmdLang.embed.color;
            embed.fields.push({ name: cmdLang.embed.Fields[0].name, value: cmdLang.embed.Fields[0].value, inline: true });
            const btNewAccount = new discord_js_1.MessageActionRow()
                .addComponents(new discord_js_1.MessageButton()
                .setLabel(cmdLang.bouton.label)
                .setStyle('PRIMARY')
                .setCustomId('Register'));
            interaction.reply({
                content: cmdLang.interaction.sendRegister,
                components: [btNewAccount],
                ephemeral: true
            });
            return interaction.user.send({
                content: token,
                embeds: [embed],
                components: [btNewAccount]
            });
        }
    }
}
exports.RegisterCommand = RegisterCommand;
