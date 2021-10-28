const { Command } = require('discord-akairo');


class GreetCommand extends Command {
    constructor() {
    super("greet", {
        aliases: ["greet"],
        slash: true
    });
}

/* Using exec and execSlash*/

    exec(message) {
        message.reply(`Hello `);
    }
    // By default it will use the normal exec method but if you specify execSlash it will run and not the exec
    // If you want it to always run execSlash you will have to add the execSlash option to your command handler
    // and it will only use the execSlash and throw a error if you aren't using it
    execSlash(message) {
        message.channel.send(`Hello `);
    }
}

module.exports = GreetCommand;