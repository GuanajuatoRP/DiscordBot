const { Command } = require('discord-akairo');
const appConfig = require('../../util/appConfig.json')
const lang = require('../../util/language.json')
const endGameLang = lang.commands.endgame

class EndGameCommand extends Command {
    constructor() {
        super('endgame', {
            aliases: ['endgame'],
            category: 'Administration',
            description: {
                content: endGameLang.description.desc,
                usage: endGameLang.description.usage,
                exemples: endGameLang.description.exemples
            },
            typing: false,
            slash: true,
            slashOnly: true
        });
    }
    async execSlash(message) {
        message.interaction.reply({
            content: endGameLang.interaction.content,
        })
        const cat = this.client.channels.cache.get(appConfig.chanels.game.categorie)
        cat.children.forEach(child => {
            if (child.id != appConfig.chanels.game.admin && child.id != appConfig.chanels.game.salleDeJeux){
                this.client.channels.cache.get(child.id).delete()
            }
        });

        const RoleA = message.guild.roles.cache.get(appConfig.Roles.GMA);
        RoleA.members.forEach(member => {
            member.roles.remove(RoleA);
        });
        const RoleB = message.guild.roles.cache.get(appConfig.Roles.GMB);
        RoleB.members.forEach(member => {
            member.roles.remove(RoleB);
        });


    }
}
module.exports = EndGameCommand