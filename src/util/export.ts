import { ExplicitContentFilterLevel, MessageAttachment, MessageComponent, MessageType, Snowflake, Sticker, VerificationLevel } from 'discord.js';
import { GuildMember, MessageEmbed, PermissionOverwrites } from 'discord.js'
import { ChannelTypes } from 'discord.js/typings/enums'
import fs from 'fs'
import path from 'path'
import lang from './language.json'
import appConf from "../util/appConfig.json"
import { client } from '..'

export const RootPath = path.resolve(path.join(__dirname,'../../'))

//* Permet de save un embed Pour la commande créate embed
export const saveEmbed = (embed:MessageEmbed) => {
    fs.writeFile(path.join(__dirname, './customEmbed.json'), JSON.stringify(embed), function writeJSON(err) {
        if (err) return console.log(err);
    })
}

//* Embed par def 
export const DefaultEmbed = () => {
        return new MessageEmbed().setAuthor(lang.embeds.default.author, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg", "https://discord.gg/BtkWVH2Kq9").setColor('#ff8000').setFooter(lang.embeds.default.footer, "https://www.gtplanet.net/wp-content/uploads/2021/08/ForzaHorizon5_KeyArt_Horiz_RGB_Final-800x450.jpg").setTimestamp().addFields()
    }

//* Embed utilisé pour logger
export const LogsEmbed = (name : string, id : string) => {
        return new MessageEmbed().setAuthor(lang.embeds.LogsEmbed.author).setColor('#ff0000').setFooter(lang.embeds.LogsEmbed.footer.format(name,id)).setTimestamp()
}

//* est utilisée a la save de channelles avec la command /getcategory
export class ChannelClass {
    public name : String = ''
    public channelInfo : ChannelInfo = new ChannelInfo()
    public messages : Array<any> = []
}

export class ChannelInfo {
    public type : ChannelTypes = ChannelTypes.GUILD_TEXT as ChannelTypes || ChannelTypes.GUILD_VOICE as ChannelTypes
    public topic : string = ''
    public permissionOverwrites : Array<PermissionOverwrites> = []
    public position : number = 0
    public userLimit : number = 0
}

//* define new methode for String type
declare global{
    interface String {
        format(...replacements: string[]): string;
    }
}

//* format method for String type
// String.prototype.format(arg,arg,...)
// formatter like String.format in c#
//* '{0}anyString{1}'.format(var1,var2) == 'var1anyStringvar2'
if (!String.prototype.format) {
    String.prototype.format = function() {
    var args = arguments;
    // regex to find '{d}' with digit match to index args.
    return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined' ? args[number] : match
    })
    }
}

//* Autocomplete /inscription
export enum PermisTypes {
    Probatoire = "Probatoire",
    Définitif = "Définitif",
    Stage_B = "Stage_B",
    Stage_A = "Stage_A",
    Stage_S1 = "Stage_S1",
    Stage_S2 = "Stage_S2"
}

//* Permet de définir si un GuildMember est admin ou non
export const IsAdmin = (member: GuildMember) => {
    // Check if the GuildMember have Admin role or he's id are in admin's id table
    return(!member.roles.cache.has(appConf.Roles.ADMIN) || !client.admins.includes(member.id))? false : true
}

//* Permet de déterminer si un GuildMember est concerner par un embed
//! Ne fonctionne que si il y a "xxx : GuildMember.tag" dans le footer et rien d'autre 
export const IsEmbedOwner = (member: GuildMember, embed: MessageEmbed) => {
    const embedMember = embed.footer!.text.split(' : ')[1] as string
    
    // if the GuildMember are and admin he can use embed
    if (IsAdmin(member)){
        return true 
    }

    // Check if the GuildMember tag is in emùbed footer 
    return (!embedMember.includes(member.user.tag))? false : true 
}

//* Crée une nouvelle immatriculation
export const NewImmatriculation = (immat: string,immatLenght : number) : string => {
    // Todo Call API get Full ImmatList on server 
    const immatList = ["00-aaa-00","20-qsd-45"]

    if (immat != "" && immatList.includes(immat)){
        return lang.commands.immatriculation.export.exist
    } else if (immat != "" && immat.length != immatLenght) {
        return lang.commands.immatriculation.export.len
    }

    if (immat == "") {
        do {
            for(let i = 0; i < 2; i++) {
                immat += Math.floor(Math. random() * (9 + 1))
            }
            immat += "-"
            for(let i = 0; i < 3; i++) {
                immat += String.fromCharCode(Math.floor(Math. random() * (90 - 65 + 1)) + 65)
            }
            immat += "-"
            for(let i = 0; i < 2; i++) {
                immat += Math.floor(Math. random() * (9 + 1))
            }
        } while (immatList.includes(immat));
    }

    return immat
}

//* Crée un nouvel Id random pour les backup
export const RandomId = (idLen: Number) : string => {
    let result : string
    do {
        result = ""

        for(let i = 0; i < idLen; i++) {
            let randomNumber : number
            do {
                randomNumber = Math.random() * (90 - 48 + 1) + 48
            } while (randomNumber < 65 && randomNumber > 58);
            result += String.fromCharCode(Math.floor(randomNumber))
        }
    } while (appConf.Config.backupIds.includes(result))

    appConf.Config.backupIds.push(result)
    fs.writeFile(path.join(__dirname, '../util/appConfig.json'), JSON.stringify(appConf), function writeJSON(err) {
        if (err) return console.log(err);
    })

    return result
}

//* Défini la date sous deux format Date Simple et Date + heur
const d = new Date
export const today = [d.getDate() > 9 ? d.getDate() : `0${d.getDate()}`,d.getMonth()+1 > 9 ? d.getMonth() : `0${d.getMonth()+1}`,d.getFullYear()].join('-')
export const dformat = today+' '+[d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`,d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`,d.getSeconds() > 9 ? d.getSeconds() : `0${d.getSeconds()}`].join(':');











//* BACKUP CLASS 
//* BACKUP CLASS 
//* BACKUP CLASS 
//* BACKUP CLASS


export interface BackupData {
    name: string;
    iconURL?: string;
    iconBase64?: string;
    verificationLevel: VerificationLevel;
    explicitContentFilter: ExplicitContentFilterLevel;
    defaultMessageNotifications: String;
    afk?: AfkData;
    widget: WidgetData;
    splashURL?: string;
    splashBase64?: string;
    bannerURL?: string;
    bannerBase64?: string;
    channels: ChannelsData;
    roles: RoleData[];
    bans: BanData[];
    emojis: EmojiData[];
    createdTimestamp: number;
    guildID: string;
    id: string;
}
export interface AfkData {
    name: string;
    timeout: number;
}
export interface BanData {
    id: Snowflake;
    reason: string;
}
export interface ChannelsData {
    categories: CategoryData[];
    others: Array<TextChannelData | VoiceChannelData >;
}
export interface CategoryData {
    name: string;
    permissions: ChannelPermissionsData[];
    children?: Array<TextChannelData | VoiceChannelData>;
}
export interface TextChannelData extends BaseChannelData {
    nsfw: boolean
    parent?: string
    topic?: string
    messages: MessageData[]
}
export interface MessageData {
    authorId: string
    type: MessageType
    avatar?: string
    avatarURL?: string
    content?: string
    embeds?: MessageEmbed[]
    components?: MessageComponent[]
    attachments?: MessageAttachment[]
    stickers?: Sticker[]
    pinned?: boolean
    editedTimestamp?:number
}
export interface VoiceChannelData extends BaseChannelData {
    bitrate: number
    userLimit: number
}
export interface BaseChannelData {
    type: string;
    name: string;
    position: number
    rawPosition: number
    parent?: string;
    permissions: ChannelPermissionsData[];
}
export interface ChannelPermissionsData {
    roleName: string;
    allow: number;
    deny: number;
}
export interface EmojiData {
    name: string;
    url?: string;
    base64?: string;
}
export interface RoleData {
    name: string;
    color: string;
    hoist: boolean;
    permissions: number;
    mentionable: boolean;
    position: number;
    isEveryone?: boolean;
}
export interface WidgetData {
    enabled: boolean;
    channel?: string;
}
