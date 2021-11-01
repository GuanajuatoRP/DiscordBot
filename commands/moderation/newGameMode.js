const { Command } = require('discord-akairo');
const lang = require('../../util/language.json')

class NewGameModeCommand extends Command {
    constructor() {
        super('newGameMode', {
            aliases: ['newGameMode'],
            category: 'Moderation',
            description: {
                content: `Permet de crée une nouvelle partie `,
                usage: `newGameMode <GameModeName>`,
                exemples: ['newGameMode <GameModeName>']
            },
            typing: false,
            slash: true,
            slashOptions: [{
            name: 'name',
            description: "Salon a backup",
            type: 'STRING',
            required: true
        }]
        });
    }
    exec(message) {
        message.reply({
            content: `Merci d'utiliser la commande avec un /`,
            ephemeral: true
        })
        message.delete();
    }
    async execSlash(message,{name}) {
        console.log(name);
        
        message.guild.channels.create(name,{
            "parentId" : 877644017582628931,
            "type": "GUILD_TEXT",
            "position": 15
        })

        message.interaction.reply({
            content: 'La commande ngm a bien été executée',
            ephemeral: true,
        })
    }
}
module.exports = NewGameModeCommand