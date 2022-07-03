import { DisTube } from "distube";
import { Message } from "discord.js";

export default{
    name: 'pause',
    description: 'stops the music',
    async execute(message: Message, disTube: DisTube){
        if(!message.member?.voice.channel){
            return message.channel.send("**You're not in the voice channel**")
        }
        if(disTube.getQueue(message)?.paused){
            return message.channel.send("**The queue is already paused**")
        }

        disTube.pause(message)
        message.channel.send("**paused...**")
    }
}
