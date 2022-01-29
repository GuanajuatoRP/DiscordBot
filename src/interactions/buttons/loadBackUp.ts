import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, Guild } from "discord.js";
import { BackupData, RootPath, wait } from "../../util/export";
import fs from 'fs'
import path from 'path'

export class LoadBackUpBtn extends Button {
    constructor(client: ShewenyClient) {
        super(client, ["LoadBackUp"]);
    }

    async execute(button: ButtonInteraction) {
        button.update({
            content: "La backup va se charger",
            embeds:[],
            components:[]
        })

        // Get Guild And Backup
        const guild = button.guild as Guild
        const bc = JSON.parse(fs.readFileSync(path.join(RootPath,'/Json/BackUp/Backup_{0}.json').format(button.message.embeds[0].fields![0].value as string)).toString()) as BackupData

        // Delete Emooji
        await guild.emojis.fetch()
        .then(emojiList => {
            emojiList.each(async e => {
                await e.delete()
            })
        })
        .catch(err => console.log(err))

        // Delete Bans
        await guild.bans.fetch()
        .then(banList => {
            banList.each(async b => {
                await guild.bans.remove(b.user)
                    .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))

        // Delete Role
        let roleList = guild.roles.cache.filter(r=> r.name != "@everyone" && !r.managed)
        roleList.each(async r => {
            await r.delete()
                .catch(err => console.log(err))
        })

        // Delete Category and channels
        await guild.channels.fetch()
        .then(channelList => {
            channelList.filter(c => c.type == "GUILD_CATEGORY").each(async c => {
                await c.delete()
                    .catch(err => console.log(err))
                await wait(100)
            })

            channelList.each(async c => {
                await c.delete()
                    .catch(err => console.log(err))
                await wait(100)
            })
        })
        .catch(err => console.log(err))



        // Setup Guild
        if (bc.name) {
            guild.setName(bc.name);
        }
        if (bc.iconBase64) {
            guild.setIcon(Buffer.from(bc.iconBase64, 'base64'));
        }
        else if (bc.iconURL) {
            guild.setIcon(bc.iconURL);
        }
        if (bc.splashBase64) {
            guild.setSplash(Buffer.from(bc.splashBase64, 'base64'));
        }
        else if (bc.splashURL) {
            guild.setSplash(bc.splashURL);
        }
        if (bc.bannerBase64) {
            guild.setBanner(Buffer.from(bc.bannerBase64, 'base64'));
        }
        else if (bc.bannerURL) {
            guild.setBanner(bc.bannerURL);
        }
        if (bc.verificationLevel) {
            guild.setVerificationLevel(bc.verificationLevel);
        }
        if (bc.defaultMessageNotifications) {
            guild.setDefaultMessageNotifications(bc.defaultMessageNotifications);
        }
        const changeableExplicitLevel = guild.features.includes('COMMUNITY');
        if (bc.explicitContentFilter && changeableExplicitLevel) {
            guild.setExplicitContentFilter(bc.explicitContentFilter);
        }



    }
}