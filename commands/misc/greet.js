const { Command } = require('discord-akairo');
class GreetCommand extends Command {
    constructor() {
    super("greet", {
        aliases: ["greet"],
        description:"dit bonjour a la personne mentionné",
        slash: true,
        slashOptions: [{
            name: "member",
            description: "The member you want to greet",
            type: "USER",
            required: true
        }]
    })
    }

    exec(message) {
        message.reply({
            content: `Merci d'utiliser la slash command`,
        })
    }
    execSlash(message,{member}) {
        message.interaction.reply(`Coucou ${member}`);
    }
}

module.exports = GreetCommand;