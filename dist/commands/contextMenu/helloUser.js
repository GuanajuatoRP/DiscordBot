"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloUserContextMenu = void 0;
const sheweny_1 = require("sheweny");
class HelloUserContextMenu extends sheweny_1.Command {
    constructor(client) {
        super(client, {
            name: "Hello",
            description: "Salut cette utilisateur",
            type: "CONTEXT_MENU_USER",
            category: "Misc",
        });
    }
    execute(interaction) {
        interaction.reply({ content: `Salut <@${interaction.targetId}> !` });
    }
}
exports.HelloUserContextMenu = HelloUserContextMenu;
