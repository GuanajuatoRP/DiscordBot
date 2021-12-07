const { Listener } = require('discord-akairo')
const appConfig = require('../../util/appConfig.json')
const fs = require('fs');
const { waitForDebugger } = require('inspector');
const wait = require('util').promisify(setTimeout);

class boutonRoleListener extends Listener {
    constructor() {
        super('boutonRole', {
            emitter: 'client',
            event: 'interactionCreate'
        });
    }
    async exec(interaction) {
        if (interaction.isButton() && interaction.customId == 'GetRole') {
            await interaction.deferUpdate()
            const RoleA = interaction.guild.roles.cache.get(appConfig.Roles.GMA);
            const RoleB = interaction.guild.roles.cache.get(appConfig.Roles.GMB);
            if (interaction.message.embeds[0].fields[0].value.indexOf(interaction.member.nickname != null ? interaction.member.nickname : interaction.member.user.username) != -1){
                console.log(interaction.member.roles.add(RoleA));
            } else {
                console.log(interaction.member.roles.add(RoleB));
            }

        }
    }
}


module.exports = boutonRoleListener;