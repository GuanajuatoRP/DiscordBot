import { MessageEmbed } from 'discord.js'
import fs from 'fs'
import path from 'path'
import lang from './language.json'

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


//* est utilise a la save de channelles avec la command /getcategory
export const ChannelObject = {
    name: String,
    channelInfo : {
        type : String,
        topic : String,
        permissionsList : Array,
        position : Number,
        userLimit : Number
    },
    messages : Array
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
