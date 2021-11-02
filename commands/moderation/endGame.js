const { Command } = require('discord-akairo');
const lang = require('../../util/language.json')
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

    }
}
module.exports = EndGameCommand