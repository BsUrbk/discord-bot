import { Message } from "discord.js"
import DisTube from "distube"

export default{
    name: 'play',
    description: 'music player',
    async execute(message: Message, disTube: DisTube){
        if(!message.member?.voice.channel){
            return message.reply({
                content: "You're not in the voice channel"
            })
        }
        
        const [command, ...song]: string[] = message.content.trim().slice(1).split(' ')

        const choices = await disTube.search(song.toString(), { limit: 10 })
        const response: string[] = choices.map((el, index) => {
            if(index == 0){
                return `**Choose from songs listed below** \r\n **${index+1}.** ${el.uploader.name} ${el.name} - \`${el.formattedDuration}\` \r\n`
            }
            return `**${index+1}.** ${el.uploader.name} ${el.name} - \`${el.formattedDuration}\` \r\n`
            
        })
        if(choices.length == 1 && message.member?.voice.channel != null && message.channel.type == "GUILD_TEXT"){
            return disTube.play(message.member.voice.channel, choices[0], {message: message, textChannel: message.channel})
        }
        message.channel.send({
            content: `${response.join('')}`
        })
        .then(() =>{
            message.channel.awaitMessages({
                filter: (m) => m.author.id === message.author.id,
                max: 1,
                time: 60000,
                errors: ['time']
            })
            .then(collected => {        
                const choice = collected.first()?.content.trim() 

                if(parseInt(choice ? choice : '1') > 0 && parseInt(choice ? choice : '1') <= 10){
                    if(message.member?.voice.channel != null && message.channel.type == "GUILD_TEXT"){
                        try{disTube.play(message.member.voice.channel, choices[parseInt(choice ? choice : '1')-1], {message: message, textChannel: message.channel, member: message.member})}
                        catch{
                            return message.channel.send("Bot is not in voice channel")
                        }
                    }
                }else{
                    message.reply({
                        content: 'Incorrect choice'
                    })
                }
            })       
        })
    }
}