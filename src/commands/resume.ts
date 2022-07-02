import { DisTube } from "distube";
import { Message } from "discord.js";

export default{
    name: 'resume',
    description: 'resumes the music',
    async execute(message: Message, disTube: DisTube){
        if(!message.member?.voice.channel){
            return message.channel.send("You're not in the voice channel")
        }
        if(!disTube.getQueue(message)?.paused){
            return message.channel.send("The queue is playing right now")
        }

        disTube.resume(message)
        message.channel.send("resumed playing")
    }
}
