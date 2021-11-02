const { Command } = require('discord-akairo');
const lang = require('../../util/language.json')
const fs = require('fs')

class GameCommand extends Command {
    constructor() {
        super('game', {
            aliases: ['game'],
            category: 'Moderation',
            description: {
                content: `Permet de crée une nouvelle partie `,
                usage: `game`,
                exemples: ['game']
            },
            typing: false,
            slash: true,
        //     slashOptions: [{
        //     name: 'name',
        //     description: "Salon a backup",
        //     type: 'STRING',
        //     required: true
        // }]
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
        try {
            const rawData = fs.readFileSync('./util/channelGame.json')
            const channels = JSON.parse(rawData)
            channels.livreur.forEach(channel => {
                message.guild.channels.create(channel.name,{
                    "type": channel.info.type,
                })
                .then(channel => {
                    channel.setParent('905214164950196224')
                })
            });
        } catch (error) {
            console.log(error);
        }

        
        

    }
}
module.exports = GameCommand