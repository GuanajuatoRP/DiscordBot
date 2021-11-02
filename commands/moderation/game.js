const { Command } = require('discord-akairo')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
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
        const rawData = fs.readFileSync('./util/channelGame.json')
        const channels = JSON.parse(rawData)
        try {
            let menu  = new MessageSelectMenu()
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
                content: 'La commande ngm a bien été executée',
                components: [gameMenu],
                ephemeral: true,
            })
            message.interaction.deferUpdate()
            message.interaction.editReply({
                content: 'La commande ngm a bien été executée',
                components: [gameMenu],
                ephemeral: true,
            })
        } catch (error) {
            console.log(error);
        }

        
        // channels.livreur.forEach(channel => {
        //     message.guild.channels.create(channel.name,{
        //         "type": channel.info.type,
        //     })
        //     .then(channel => {
        //         channel.setParent('905214164950196224')
        //     })
        // });


        
        

    }
}
module.exports = GameCommand