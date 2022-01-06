"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndGameCommand = void 0;
const sheweny_1 = require("sheweny");
const language_json_1 = __importDefault(require("../../../util/language.json"));
const cmdLang = language_json_1.default.commands.endgame;
const appConfig_json_1 = __importDefault(require("../../../util/appConfig.json"));
class EndGameCommand extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: 'endgame',
            category: 'Admin',
            // type: '', //* Default type is SLASH_COMMAND
            description: cmdLang.description.desc,
            usage: cmdLang.description.usage,
            examples: cmdLang.description.exemples,
            options: [
            // {
            //    type : 'STRING',
            // name: 'commande',
            // description: '',
            // autocomplete : false,
            // required : false,
            // }
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
        const cat = interaction.guild.channels.cache.get(appConfig_json_1.default.chanels.game.categorie);
        if (cat.type !== 'GUILD_CATEGORY') {
            interaction.reply({
                content: 'Catégorie non trouvé',
                ephemeral: true
            });
        }
        cat.children.forEach((child) => {
            if (child.id != appConfig_json_1.default.chanels.game.admin && child.id != appConfig_json_1.default.chanels.game.salleDeJeux) {
                this.client.channels.cache.get(child.id).delete();
            }
        });
        const RoleA = interaction.guild.roles.cache.get(appConfig_json_1.default.Roles.GMA);
        RoleA.members.forEach(member => {
            member.roles.remove(RoleA);
        });
        const RoleB = interaction.guild.roles.cache.get(appConfig_json_1.default.Roles.GMB);
        RoleB.members.forEach(member => {
            member.roles.remove(RoleB);
        });
        return interaction.reply({
            content: cmdLang.interaction.content,
            ephemeral: true
        });
    }
}
exports.EndGameCommand = EndGameCommand;
