import { BackupData, AfkData, EmojiData, BanData, RoleData, ChannelPermissionsData, CategoryData, TextChannelData, VoiceChannelData, MessageData, ChannelsData, RandomId, RootPath, DefaultEmbed, dformat } from './../../../util/export'
import { Command } from 'sheweny'
import path from "path"
import fs from 'fs'
import type { ShewenyClient } from 'sheweny'
import type { ColorResolvable, CommandInteraction, Guild } from 'discord.js'
import lang from '../../../util/language.json'
const CommandLang = lang.commands.backUpCreate



export class BackUpCreateCommand extends Command {
    constructor(client: ShewenyClient) {
        super(client, {
            name: 'bc',
            // category: '', //* Default category is InDev
            // type: '', //* Default type is SLASH_COMMAND
            description: CommandLang.description.desc,
            usage : CommandLang.description.usage,
            examples : CommandLang.description.exemples,
            options : [
                // {
                    // type : 'STRING',
                    // name: 'commande',
                    // description: CommandLang,
                    // autocomplete : false,
                    // required : false,
                    //}
            ],
            defaultPermission : true,
            // channel : '', //* Default Channel is GUILD
            // cooldown : , //* Default cooldown set at 2sec
            adminsOnly : true, //* Default value is false 
            //userPermissions : [],
            //clientPermissions : []
        });
    }
    async execute(interaction : CommandInteraction) {
        //! this.client.emit('CommandLog', interaction)
        interaction.deferReply();

        const guild = interaction.guild as Guild
        let backUp = {} as BackupData

        let afk = {} as AfkData
            afk.name = guild.afkChannel!.name
            afk.timeout = guild.afkTimeout

        //? let widget = {} as WidgetData
        //?     widget.enabled = guild.widgetEnabled as boolean
        //?     widget.channel = guild.widgetChannel!.name

        let emojisTab = [] as Array<EmojiData>
        const empjiList = await guild.emojis.fetch()
        empjiList.forEach(e => {
            let emoji = {} as EmojiData
            emoji.name = e.name as string
            emoji.url = e.url
            emojisTab.push(emoji)
        });

        let bansTab = [] as Array<BanData>
        const BanList = await guild.bans.fetch()
        BanList.forEach(b => {
            let ban = {} as BanData
            ban.id = b.user.id
            ban.reason = b.reason as string
            bansTab.push(ban)
        })

        let rolesTab = [] as Array<RoleData>
        guild.roles.cache.forEach(r => {
            let role = {} as RoleData
            role.name = r.name
            role.color = r.color.toString()
            role.hoist = r.hoist
            role.permissions = r.permissions.bitfield.toString()
            role.mentionable = r.mentionable
            role.position = r.position
            rolesTab.push(role)
        })

        const ChannelList = await guild.channels.fetch()
        const catChannels = ChannelList.filter(c => c.type == "GUILD_CATEGORY")
        let channelPermissionsTab = [] as Array<ChannelPermissionsData>
        let categoryDataTab = [] as Array<CategoryData>

        catChannels.forEach((c) => {
            let channelPermissions = {} as ChannelPermissionsData
            c.permissionOverwrites.cache.each(p => {
                channelPermissions.roleName = guild.roles.cache.get(p.id)!.name as string
                channelPermissions.allow = Number(p.allow.toJSON())
                channelPermissions.deny = Number(p.deny.toJSON())
                channelPermissionsTab.push(channelPermissions)
            })
            let categoryData = {} as CategoryData
            categoryData.name = c.name
            categoryData.permissions = channelPermissionsTab
            categoryDataTab.push(categoryData)
        })

        let otherChannel = [] as Array<TextChannelData | VoiceChannelData>
        let salonList = await guild.channels.fetch()
        salonList = salonList.filter(c => c.type != 'GUILD_CATEGORY')

        for (const salon of salonList) {
            const c = salon[1]
            const salonpermissionTab = [] as Array<ChannelPermissionsData>

            c.permissionOverwrites.cache.each(p => {
                let perm = {} as ChannelPermissionsData
                perm.roleName = guild.roles.cache.get(p.id)!.name as string
                perm.allow = Number(p.allow)
                perm.deny = Number(p.deny)
                salonpermissionTab.push(perm)
            })

            switch (c.type) {
                case "GUILD_TEXT" || "GUILD_STORE" || "GUILD_NEWS":
                    let channelMessageTab = [] as Array<MessageData>

                    await c.messages.fetch()
                        .then(messageList => {
                        messageList.forEach(m => {
                            let messageAttachement = []
                            for (const attachementCollection of m.attachments) {
                                const attachments = attachementCollection[1]
                                messageAttachement.push(attachments)
                            }
                            let message = {} as MessageData
                            message.authorId = m.author.id
                            message.type = m.type
                            message.avatar = m.author.avatar as string
                            message.avatarURL = m.author.avatarURL() as string
                            message.content = m.content
                            message.embeds = m.embeds
                            message.components = m.components
                            message.stickers = [...m.stickers.values()]
                            message.pinned = m.pinned
                            message.editedTimestamp = m.editedTimestamp as number
                            message.attachments = messageAttachement
                            channelMessageTab.push(message)
                        })
                    })

                    let channel = {} as TextChannelData
                    channel.type = c.type
                    channel.name = c.name
                    channel.parent = c.parent!.name
                    channel.permissions = salonpermissionTab
                    channel.nsfw = c.nsfw
                    channel.position = c.position
                    channel.rawPosition = c.rawPosition
                    channel.topic = c.topic as string
                    channel.messages = channelMessageTab
                    otherChannel.push(channel)
                    break


                case "GUILD_VOICE" || "GUILD_STAGE_VOICE":
                    let voiceChannel = {} as VoiceChannelData
                    voiceChannel.bitrate = c.bitrate
                    voiceChannel.userLimit = c.userLimit
                    voiceChannel.type = c.type
                    voiceChannel.name = c.name
                    voiceChannel.position = c.position
                    voiceChannel.rawPosition = c.rawPosition
                    voiceChannel.parent = c.parent!.name
                    voiceChannel.permissions = salonpermissionTab
                    otherChannel.push(voiceChannel)
                    break
            }
        }

        let salons = {} as ChannelsData
        salons.categories = categoryDataTab
        salons.others = otherChannel


        backUp.name = guild.name
        backUp.date = dformat
        backUp.iconURL = guild.iconURL() as string
        // backUp.iconBase64 = guild.icon as string
        backUp.verificationLevel = guild.verificationLevel
        backUp.explicitContentFilter = guild.explicitContentFilter
        backUp.defaultMessageNotifications = guild.defaultMessageNotifications
        backUp.afk = afk
        //? backUp.widget = widget
        backUp.splashURL = guild.splashURL() as string
        // backUp.splashBase64 = guild.splash as string
        backUp.bannerURL = guild.bannerURL() as string
        // backUp.bannerBase64 = guild.banner as string
        backUp.createdTimestamp = guild.createdTimestamp
        backUp.guildID = guild.id
        backUp.id = RandomId(9)
        backUp.emojis = emojisTab
        backUp.bans = bansTab
        backUp.roles = rolesTab
        backUp.channels = salons


        fs.appendFile(path.join(RootPath, "/Json/BackUp/Backup_{0}.json").format(backUp.id), `${JSON.stringify(backUp)}`, (err) => {
            if (err)
                throw err
        });

        const embed = DefaultEmbed()
        embed.setTitle(CommandLang.embed.Title)
        embed.addFields([
                { name: CommandLang.embed.fields.name.name, value: backUp.name, inline: false },
                { name: CommandLang.embed.fields.Id.name, value: backUp.id, inline: false }
            ])
        embed.setColor(CommandLang.embed.color as ColorResolvable);


        return interaction.editReply({
            embeds: [embed]
        });
    }
}