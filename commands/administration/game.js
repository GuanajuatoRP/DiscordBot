const { Command } = require('discord-akairo')
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const fs = require('fs')
const lang = require('../../util/language.json')
const gameLang = lang.commands.game

class GameCommand extends Command {
    constructor() {
        super('game', {
            aliases: ['game'],
            category: 'Administration',
            description: {
                content: gameLang.description.desc,
                usage: gameLang.description.usage,
                exemples: gameLang.description.exemples
            },
            typing: false,
            slash: true,
            slashOnly: true
        });
    }
    async execSlash(message) {
        const rawData = fs.readFileSync('./util/channelGame.json')
        const channels = JSON.parse(rawData)
        try {
            let menu = new MessageSelectMenu()
                .setCustomId('gameMenu')
                .setPlaceholder(gameLang.menu.Placeholder)

            Object.keys(channels).forEach(key => {
                menu.addOptions([{
                    label: `${key}`,
                    description: `${gameLang.menu.description} ${key}`,
                    value: `${key}`,
                }])
            });

            const gameMenu = new MessageActionRow()
                .addComponents(menu)


            message.interaction.reply({
                content: gameLang.interaction.content,
                components: [gameMenu],
                ephemeral: true,
            })

        } catch (error) {
            console.log(error);
        }

    }
}
module.exports = GameCommand