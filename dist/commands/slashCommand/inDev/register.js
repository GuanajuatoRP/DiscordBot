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
const registerLang = language_json_1.default.commands.register;
class RegisterCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'register',
            // category: 'Misc', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: registerLang.description.desc,
            usage: registerLang.description.usage,
            examples: registerLang.description.exemples,
            options: [
            // {
            // type : 'STRING',
            // name: 'commande',
            // description: '',
            // autocomplete : false,
            // required : false,
            //}
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
        const userAlreadyregister = true;
        if (userAlreadyregister) {
            return interaction.reply({
                content: 'Vous avez deja été enregistrer sur le Rôleplay',
                ephemeral: true
            });
        }
        else {
            const token = 'token autentification';
            let embed = (0, export_1.DefaultEmbed)();
            embed.title = registerLang.embed.title;
            embed.color = registerLang.embed.color;
            embed.fields.push({ name: registerLang.embed.Fields[0].name, value: registerLang.embed.Fields[0].value, inline: true });
            const btNewAccount = new discord_js_1.MessageActionRow()
                .addComponents(new discord_js_1.MessageButton()
                .setLabel('Je crée mon compte !')
                .setStyle('LINK')
                .setURL('https://www.youtube.com/watch?v=ORBwkXsUNEs'));
            interaction.reply({
                content: `Vos information d'enregistrement vont vous être envoyé en privé `,
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
