const { AkairoMessage, Command } = require("discord-akairo");
const { Formatters, Message } = require("discord.js");
const util = require("util");

class UserCommand extends Command {
	constructor() {
		super("user", {
			aliases: ["user"],
			slashOnly: true,
			slash: true,
			slashOptions: [
				{
					name: "user",
					description: "user aaaaaaa",
					type: "USER",
					required: true,
					resolve: "member"
				}
			],
			slashGuilds: ["786417336978112582"]
		});
	}

	exec(message) {
        message.reply('Pong!')
	}
}

module.exports = UserCommand;