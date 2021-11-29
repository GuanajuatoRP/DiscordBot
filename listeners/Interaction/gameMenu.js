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

            channels[interaction.values[0]].forEach(salon => {
                interaction.message.guild.channels.create(salon.name, {
                        "type": salon.channelInfo.type,
                    })
                    .then(channel => {
                        channel.setParent('905214164950196224')
                        channel.permissionOverwrites.set(salon.channelInfo.permissionOverwrites)
                    })
            });
        }
    }
}


module.exports = GameMenuListener;