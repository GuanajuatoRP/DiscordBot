const { Command } = require('discord-akairo');


class GreetCommand extends Command {
  constructor() {
    super("greet", {
      aliases: ["greet"],
      // Text Command Arguments
      args: [
        {
          id: "member",
          type: "member",
          match: "content"
        }
      ],
      // Enable slash for this command
      slash: true,
      // Currently you have to specify the options you want the command to be generated with (assuming you have
      // autoRegisterSlashCommands enabled)
      // In the future you will be able to choose to have them created from your existing arguments
      slashOptions: [
        {
          name: "member",
          description: "The member you want to greet",
          type: "USER",
          required: true
        }
      ]
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
    message.reply(`Hello `);
  }
}

module.exports = GreetCommand;