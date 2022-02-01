import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, ColorResolvable, Guild, OverwriteData, OverwriteResolvable, Role} from "discord.js";
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
        this.client.activeBackup = new Set([guild.id])

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
        .then(async channelList => {
            for (const channel of channelList) {
                const c = channel[1]
                c.delete()
                await wait(200)
            }
        })
        .catch(err => console.log(err))

        await wait(5000)

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
        console.log("Delete Fini")

        console.log('Start Loading');
        
        // Load Roles
        for (const r of bc.roles) {
            if (r.name == "@everyone"){
                await guild.roles.cache.get(guild.id)!.edit({
                    name: r.name,
                    color: r.color as ColorResolvable,
                    hoist: r.hoist,
                    permissions: BigInt(r.permissions),
                    mentionable: r.mentionable
                })
                .then(r => console.log("Le role {0} a été modifier".format(r.name)))
                .catch(err => console.log(err))
            } else {
                await guild.roles.create({
                    name: r.name,
                    color: r.color as ColorResolvable,
                    hoist: r.hoist,
                    permissions: BigInt(r.permissions),
                    mentionable: r.mentionable
                })
                .then(r => console.log("Le role {0} a été crée".format(r.name)))
                .catch(err => console.log(err))
            }
        }
        const NewRoleList = guild.roles.cache.toJSON()


        // //? Load Catégory
        const categoryList = bc.channels.categories
        for (const categoryData of categoryList) {
            await guild.channels.create(categoryData.name,{ type: 'GUILD_CATEGORY' })
            .then(async category => {
                let finalPermissions = new Array<OverwriteResolvable>()
                const permissionList = categoryData.permissions
                for (const perm of permissionList) {
                    const ro = guild.roles.cache.find((r) => r.name == perm.roleName) as Role
                    
                    console.log(NewRoleList.map(r => r.name))
                    console.log("perm.name => {0}".format(perm.roleName))
                    // if (category.name == "Accueil"){
                    //     console.log(perm.roleName)
                    // }

                    // console.log(guild.roles.cache.get(ro.id)!.name)

                    if (ro) {
                        finalPermissions.push({
                            id: ro.id,
                            allow: BigInt(perm.allow),
                            deny: BigInt(perm.deny)
                        } as OverwriteData )
                    }
                }

                // console.log(finalPermissions)
                category.permissionOverwrites.set(finalPermissions)
                .catch(err => console.log(err))
            })
            console.log("Channel en cours")
        }
        console.log("Channel Fini")

        // backupData.channels.others.forEach(function (channelData) {
        //     util_1.loadChannel(channelData, guild, null, options);
        // });

        // Indique que la backup est finie
        this.client.activeBackup.delete(bc.id)
        console.log('Fini')
    }
}