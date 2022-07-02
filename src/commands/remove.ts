import { DisTube } from "distube";
import { Message } from "discord.js";

export default{
    name: 'remove',
    description: 'removes song from queue',
    async execute(message: Message, disTube: DisTube){
        if(!message.member?.voice.channel){
            return message.channel.send("You're not in the voice channel")
        }
        const queue = disTube.getQueue(message)
        const [command, ...choice]: string[] = message.content.trim().slice(1).split(' ')
        const index = parseInt(choice.join(' '))
        
        if(queue){
            try{
                message.channel.send(`Removed ${queue.songs[index - 1].name}`)
                queue.songs.splice(index - 1)
            }
            catch{
                return message.channel.send("Index out of range")
            }
        }
    }
}
