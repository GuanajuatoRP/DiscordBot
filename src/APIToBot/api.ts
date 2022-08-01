import express from 'express'
import { Guild, GuildMember, Role, TextChannel } from "discord.js"
import { userValidateModel } from "./Model/UserValidatedModel"
import { client } from '../index'
import appConf from '../util/appConfig.json'
import apiLang from '../util/language.json'



export const app = express();
app.use(express.json());

// Check if the user with {{userId}}
app.get("/isUserOnServer/:userId", async (req: express.Request, res: express.Response) => {
    const guild = await client.guilds.fetch(appConf.botConfig.guildid);
    let result = false;
    await guild.members.fetch(req.params.userId)
    .then((user) => {
        result = true;
        console.log(apiLang.api.isUserOnServer.true.format(req.params.userId,user.displayName));
    })
    .catch((reason) => {
        result = false;
        console.log(reason);
        console.log(apiLang.api.isUserOnServer.false.format(req.params.userId));
    });
    res.send(result);
});
app.post("/test", async (req: express.Request, res: express.Response) => {
    const guild = await client.guilds.fetch(appConf.botConfig.guildid);
    const channel = await guild.channels.cache.get('902244087258828872') as TextChannel;
    
    channel.send(req.body.message);
    res.send(req.body.message);
});

app.post("/uservalidated", async (req: express.Request, res: express.Response) => {
    const user = new userValidateModel();
    user.userId = req.body.userId;
    user.token = req.body.token;

    
    // get guild
    const guild = await client.guilds.fetch(appConf.botConfig.guildid) as Guild

    // set new role
    const member = guild.members.cache.get(user.userId) as GuildMember 
    member.roles.add(member.guild.roles.cache.get(appConf.Roles.INSCRIT) as Role)

    //log in channel
    const channel = await guild.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel;
    channel.send(apiLang.api.uservalidated.registered.format(req.body.userId));

    res.sendStatus(200);
})
