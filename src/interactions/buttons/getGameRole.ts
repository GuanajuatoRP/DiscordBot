import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, GuildMember, Role } from "discord.js";
import appConfig from '../../util/appConfig.json'

export class GetGameRoleBtns extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["GetGameRole"]);
    }

    async execute(button: ButtonInteraction) {
        const member = button.member as GuildMember
        await button.deferUpdate()
        const RoleA = button.guild!.roles.cache.get(appConfig.Roles.GMA) as Role
        const RoleB = button.guild!.roles.cache.get(appConfig.Roles.GMB) as Role

        // gives the role to the user according to the embed 
        if (button.message.embeds[0].fields![0].value.indexOf(member.displayName) != -1){
            member.roles.add(RoleA)
        } else {
            member.roles.add(RoleB)
        }
    }
}