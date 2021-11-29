const { Command } = require('discord-akairo');
const appConfig = require('../../util/appConfig.json')
const fs = require('fs')

class EndGameCommand extends Command {
    constructor() {
        super('endgame', {
            aliases: ['endgame'],
            category: 'Moderation',
            description: {
                content: `Permet terminer une partie `,
                usage: `endgame`,
                exemples: ['endgame']
            },
            typing: false,
            slash: true,
        });
    }
    exec(message) {
        message.reply({
            content: `Merci d'utiliser la commande avec un /`,
            ephemeral: true
        })
        message.delete();
    }
    async execSlash(message) {
        message.interaction.reply({
            content: 'La commande ngm a bien été executée',
            ephemeral: true,
        })
        const cat = this.client.channels.cache.get(appConfig.chanels.game.categorie)
        cat.children.forEach(child => {
            if (child.id != appConfig.chanels.game.admin && child.id != appConfig.chanels.game.salleDeJeux){
                this.client.channels.cache.get(child.id).delete()
            }
        });
    }
}
module.exports = EndGameCommand