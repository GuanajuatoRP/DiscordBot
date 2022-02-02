import { Button } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ButtonInteraction, CategoryChannel, ColorResolvable, Guild, OverwriteData, OverwriteResolvable, Role} from "discord.js";
import { BackupData, RootPath, TextChannelData, VoiceChannelData, wait } from "../../util/export";
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
        console.log("Start Backup")


        // Get Guild And Backup
        const guild = button.guild as Guild
        const bc = JSON.parse(fs.readFileSync(path.join(RootPath,'/Json/BackUp/Backup_{0}.json').format(button.message.embeds[0].fields![0].value as string)).toString()) as BackupData
        this.client.activeBackup = new Set([guild.id])


        console.log("delete Emoji")
        // Delete Emooji
        await guild.emojis.fetch()
        .then(emojiList => {
            emojiList.each(async e => {
                await e.delete()
            })
        })
        .catch(err => console.log(err))


        console.log("Delete Bans")
        // Delete Bans
        await guild.bans.fetch()
        .then(banList => {
            banList.each(async b => {
                await guild.bans.remove(b.user)
                    .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))


        console.log("Delete Role")
        // Delete Role
        let roleList = guild.roles.cache.filter(r=> r.name != "@everyone" && !r.managed)
        roleList.each(async r => {
            await r.delete()
                .catch(err => console.log(err))
        })


        console.log("delete Category and channel")
        // Delete Category and channels
        await guild.channels.fetch()
        .then(async channelList => {
            for (const channel of channelList) {
                const c = channel[1]
                await c.delete()
                await wait(200)
            }
        })
        .catch(err => console.log(err))
        console.log("DELETE FINI")
        await wait(5000)



        console.log('SETUP GUILD');
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




        console.log('\nROLE');
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
        // const NewRoleList = guild.roles.cache.toJSON()



        console.log("\nCATEGORY");
        //? Load Category
        const categoryList = bc.channels.categories
        for (const categoryData of categoryList) {
            await guild.channels.create(categoryData.name,{ type: 'GUILD_CATEGORY' })
            .then(async category => {
                let finalPermissions = new Array<OverwriteResolvable>()
                const permissionList = categoryData.permissions

                for (const perm of permissionList) {
                    const ro = guild.roles.cache.find((r) => r.name == perm.roleName) as Role
                    if (ro) {
                        finalPermissions.push({
                            id: ro.id,
                            allow: BigInt(perm.allow),
                            deny: BigInt(perm.deny)
                        } as OverwriteData )
                    }
                }
                category.permissionOverwrites.set(finalPermissions)
                .catch(err => console.log(err))



                console.log("Category : {0}".format(category.name))
            })
        }
        
        console.log('\nSALON')
        const salonList = bc.channels.others
        const parentList = (await guild.channels.fetch()).filter(c => c.type === 'GUILD_CATEGORY').toJSON()
        for (const salon of salonList) {
            switch (salon.type) {
                case 'GUILD_TEXT':
                    const c = salon as TextChannelData
                    await guild.channels.create(c.name,{
                        type: 'GUILD_TEXT',
                        topic: c.topic,
                        nsfw: c.nsfw
                    })
                    .then(async channel => {
                        await channel.setParent(parentList.find(cat => cat.name == c.parent) as CategoryChannel)
                        .catch(err => console.log(err));
                        await channel.setPosition(c.position)
                        .catch(err => console.log(err));


                        console.log('Salon Textuel : {0}'.format(channel.name));
                    })
                    .catch(err => console.log(err));
                    break;
                case 'GUILD_VOICE':
                    const v = salon as VoiceChannelData
                    await guild.channels.create(v.name,{
                        type: 'GUILD_VOICE',
                        bitrate: v.bitrate,
                        userLimit: v.userLimit
                    })
                    .then(async channel => {
                        await channel.setParent(parentList.find(cat => cat.name == v.parent)! as CategoryChannel)
                        .catch(err => console.log(err));
                        await channel.setPosition(v.position)
                        .catch(err => console.log(err));


                        console.log('Salon vocal : {0}'.format(channel.name));
                    })
                    break;
                }
        }

        // backupData.channels.others.forEach(function (channelData) {
        //     util_1.loadChannel(channelData, guild, null, options);
        // });

        // Indique que la backup est finie
        this.client.activeBackup.delete(bc.id)
        console.log('Fini')
    }
}