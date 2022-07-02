import { DisTube } from "distube";
import { Message } from "discord.js";

export default{
    name: 'queue',
    description: 'returns list of songs in queue',
    async execute(message: Message, disTube: DisTube){
        if(!message.member?.voice.channel){
            return message.channel.send("You're not in the voice channel")
        }
        const queue = disTube.getQueue(message)
        if(queue){
            const queueText = queue.songs.map((song) =>{
                return `**${queue.songs.indexOf(song)+1}.** ${song.name} - \`${song.formattedDuration}\`  \r\n`
            }).join('')
            message.channel.send(queueText)
        }
        return
    }
}