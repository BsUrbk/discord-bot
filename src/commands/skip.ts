import { DisTube } from "distube";
import { Message } from "discord.js";

export default{
    name: 'skip',
    description: 'skips the currently played song',
    async execute(message: Message, disTube: DisTube){
        if(!message.member?.voice.channel){
            return message.channel.send("**You're not in the voice channel**")
        }
        const queue = disTube.getQueue(message)
        if(queue && queue.songs.length > 1){
            return disTube.skip(message)
        }
        return message.channel.send("**There's no song up next**")
    }
}