import { DisTube } from "distube"
import { Message } from "discord.js"

export default{
    name: 'stop',
    description: 'disconnects bot from voice channel',
    async execute(message: Message, disTube: DisTube){
        if(!message.member?.voice.channel){
            return message.reply({
                content: "You're not in the voice channel"
            })
        }

        disTube.stop(message)
        message.channel.send("Leaving the channel")
    }
}