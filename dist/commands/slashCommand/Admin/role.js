"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCommand = void 0;
const sheweny_1 = require("sheweny");
const discord_js_1 = require("discord.js");
const export_1 = require("../../../util/export");
const appConfig_json_1 = __importDefault(require("../../../util/appConfig.json"));
const language_json_1 = __importDefault(require("../../../util/language.json"));
const roleLang = language_json_1.default.commands.role;
class RoleCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'role',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: roleLang.description.desc,
            usage: roleLang.description.usage,
            examples: roleLang.description.exemples,
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
        interaction.guild.channels.fetch(appConfig_json_1.default.chanels.game.salleDeJeux)
            .then(channel => {
            const guildChannel = channel;
            const membersOfChannel = Array.from(guildChannel.members);
            let role = (0, export_1.DefaultEmbed)();
            let teamA = new Array();
            let teamB = new Array();
            // boucle sur la moitier supérieur du nombre de personne dans le salons salle de jeux
            for (let i = 0; i < Math.ceil(membersOfChannel.length / 2); i++) {
                // fournis un nombre random entre 0 et le nombre de personne dans le salon
                let idx = Math.floor(Math.random() * (membersOfChannel.length - 0)) + 0;
                // récupère puis push le user dans team A 
                let member = membersOfChannel[idx];
                teamA.push(member[1].nickname != null ? member[1].nickname : member[1].user.username);
                // delete user de la liste    
                membersOfChannel.splice(membersOfChannel.indexOf(member), 1);
            }
            // add les user restant a la 2ème team
            membersOfChannel.forEach(member => {
                teamB.push(member[1].nickname != null ? member[1].nickname : member[1].user.username);
            });
            role.setAuthor("Répartition des équipes");
            if (membersOfChannel.length > 0) {
                role.addField(roleLang.embed.Fields[0].teamname, `${teamA.join(",")}`, false);
                role.addField(roleLang.embed.Fields[1].teamname, `${teamB.join(",")}`, false);
                const btGetRole = new discord_js_1.MessageActionRow()
                    .addComponents(new discord_js_1.MessageButton()
                    .setCustomId('GetGameRole')
                    .setLabel(roleLang.bouton.label)
                    .setStyle('PRIMARY'));
                return interaction.reply({
                    embeds: [role],
                    components: [btGetRole]
                });
            }
            else {
                return interaction.reply({
                    content: roleLang.interaction.error.content,
                    ephemeral: true
                });
            }
        });
    }
}
exports.RoleCommand = RoleCommand;
