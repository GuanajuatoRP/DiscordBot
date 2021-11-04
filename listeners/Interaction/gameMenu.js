const { Listener } = require('discord-akairo')
const fs = require('fs')

class GameMenuListener extends Listener {
    constructor() {
        super('interactionCreate', {
            emitter: 'client',
            event: 'interactionCreate'
        });
    }

    async exec(interaction) {
        if (interaction.isSelectMenu() && interaction.customId == 'gameMenu') {
            const rawData = fs.readFileSync('./util/channelGame.json')
            const channels = JSON.parse(rawData)
            await interaction.update({
                content: `Vous avez choisi le mode de jeux ${interaction.values[0]}`,
                components: [],
                ephemeral: true
            })

            channels[interaction.values[0]].forEach(channel => {
                interaction.message.guild.channels.create(channel.name, {
                        "type": channel.info.type,
                    })
                    .then(channel => {
                        channel.setParent('905214164950196224')
                    })
            });
        }
    }
}


module.exports = GameMenuListener;