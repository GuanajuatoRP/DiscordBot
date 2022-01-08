import { ShewenyClient } from "sheweny"
import appConfig from "./util/appConfig.json"
import lang from './util/language.json'
import dotenv from 'dotenv';
import express from "express";
import { TextChannel } from "discord.js";
import { userValidateModel } from "./Api/Model/UserValidatedModel";

dotenv.config();

const client = new ShewenyClient({
    intents: 32767,
    admins: appConfig.botConfig.admins, // Admins perms pour le bot
    mode: 'development', //mode de lancement pour l'app
    presence: { //status du bot 
        status: "online",
        afk: false,
        activities: [{
            name: lang.bot.status.name,
            type: 'PLAYING',
        }],
    },
    managers: {
        commands: {
            directory: "./commands", // command directory
            loadAll: true,
            guildId: appConfig.botConfig.guildid,
            applicationPermissions: false, //If the permissions for app commands must be required
            autoRegisterApplicationCommands: true, // Register application commands
            default : { // set default params for all commands
                adminOnly : false,
                category : 'InDev',
                channel : 'GUILD',
                cooldown : 2,
                examples : ['/newExample','/newExample'],
                usage : ['/newExample aaa'],
                type : 'SLASH_COMMAND',
            }
        },
        events: {
            directory: "./listeners", //Event directory
            loadAll: true,
        },
        buttons: {
            directory: "./interactions/buttons", //Button directory
            loadAll: true,
        },
        // inhibitors: {
        //     directory: "./inhibitors",
        //     loadAll: true,
        // },
        // selectMenus: {
        //     directory: "./interactions/select-menu",
        //     loadAll: true,
        // },
    },
});
client.login(process.env.TOKEN);

const port = 5000;
const app = express();
app.use(express.json());

app.get("/isUserOnServer/:discordId", async (req: express.Request, res: express.Response) => {
    const guild = await client.guilds.fetch('877644017255465011');
    let result = false;
    guild.members.fetch(req.params.discordId)
    .then((user) => {
        result = true;
        console.log("isUserOnServer: ",req.params.discordId, " result: ", user.displayName);
    })
    .catch((reason) => {
        result = false;
        console.log("isUserOnServer: ",req.params.discordId, " result: unknown user");
    });
    res.send(result);
});
app.post("/test", async (req: express.Request, res: express.Response) => {
    const guild = await client.guilds.fetch('877644017255465011');
    const channel = await guild.channels.cache.get('902244087258828872') as TextChannel;
    
    channel.send(req.body.message);
    res.send(req.body.message);
});

app.post("/uservalidated", async (req: express.Request, res: express.Response) => {
    const user = new userValidateModel();
    user.discordId = req.body.discordId;
    user.token = req.body.token;

    //todo : give role
    //log in channel
    const guild = await client.guilds.fetch('877644017255465011');
    const channel = await guild.channels.cache.get('902244087258828872') as TextChannel;
    channel.send(`L'utilisateur ${req.body.discordId} s'est enregistré avec succès`);

    res.sendStatus(200).send("OK");
})
app.listen( port, () => console.log(`server started at http://localhost:${port}`));
