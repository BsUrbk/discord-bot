import dotenv from 'dotenv'
import { discordClient } from './utils/discord.client'
import fs from 'fs'
import path from 'path'
import DisTube, { Queue, QueueManager } from "distube"
import { SpotifyPlugin } from "@distube/spotify"
import { GuildMember } from 'discord.js'
import EventHandler from "./utils/event.handler"

dotenv.config()

const commandNames: any = {}
const eventHandler = new EventHandler

discordClient.on('ready', async() => {
    let commands: any
    const commandFiles = fs.readdirSync(path.join(__dirname, process.env.COMMANDS_DIR as string))
    commands = discordClient.application?.commands

    const importedCommands = commandFiles.map((commandFile) =>{  
        return import(`./commands/${commandFile}`)
    })

    const promisedCommands = await Promise.all(importedCommands)
    
    promisedCommands.forEach((importedCommand) => {
        const commandConfig = importedCommand.default
        console.info(`Loading command config of: ${commandConfig.name}`)

        try{
            commands.create(commandConfig)
            commandNames[commandConfig.name] = commandConfig
        }catch{ (err: any) => console.error(err); return}
    })
    
    console.info('Bot is up')
})

const distube = new DisTube(discordClient, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    leaveOnEmpty: false,
    leaveOnStop: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()],
})

const prefix = "!"

discordClient.on("messageCreate", async (message) =>{
    if(!message.content.startsWith(prefix) || message.content.trim().indexOf(prefix) !== 0 || message.author.bot || !message.guildId || !message.id)
        return

    const name: string[] = message.content.trim().slice(1).split(' ')
    
    if(commandNames[name[0]]){
        return commandNames[name[0]].execute(message, distube)
    }
        
})

// discordClient.on("guildMemberAdd", (member: GuildMember) =>{
//     eventHandler.createMemberProfile(member)
// })

distube.on("playSong", (queue: Queue, song) =>{
    queue.textChannel?.send(`Playing ${song.name} - \`${song.formattedDuration}\``)
})

distube.on("addSong", (queue: Queue, song) =>{
    queue.textChannel?.send(`Added ${song.name} \`${song.formattedDuration}\` to the queue`)
})


discordClient.login(process.env.TOKEN)
