const { Command } = require('discord-akairo')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const fs = require('fs')

class GameCommand extends Command {
    constructor() {
        super('game', {
            aliases: ['game'],
            category: 'Administration',
            description: {
                content: `Permet de crée une nouvelle partie `,
                usage: `game`,
                exemples: ['game']
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
        const rawData = fs.readFileSync('./util/channelGame.json')
        const channels = JSON.parse(rawData)
        try {
            let menu = new MessageSelectMenu()
                .setCustomId('gameMenu')
                .setPlaceholder('Merci de choisir un mode de jeux')

            Object.keys(channels).forEach(key => {
                menu.addOptions([{
                    label: `${key}`,
                    description: `selection de l\'option ${key}`,
                    value: `${key}`,
                }])
            });

            const gameMenu = new MessageActionRow()
                .addComponents(menu)


            message.interaction.reply({
                content: 'Liste des modes de jeux :',
                components: [gameMenu],
                ephemeral: true,
            })

        } catch (error) {
            console.log(error);
        }

    }
}
module.exports = GameCommand