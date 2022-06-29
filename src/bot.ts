import dotenv from 'dotenv'
import { discordClient } from './utils/discord.client'
import fs from 'fs'
import path from 'path'

dotenv.config()

const commandNames: any = {}

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
    console.log('Bot is up')
})

const prefix = "!"

discordClient.on("messageCreate", async (message) =>{
    if(!message.content.startsWith(prefix))
        return

    const name: string = message.content.trim().slice(1)
    console.log(commandNames)
    if(commandNames[name]){
        return commandNames[name].callback(message)
    }
    
})



discordClient.login(process.env.TOKEN)