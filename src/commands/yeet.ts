import { CommandInteraction } from "discord.js"

const handleTest = async(interaction: CommandInteraction) => {
    return interaction.reply({
        content: `Pog`
    })
}

export default{
    callback: handleTest,
    name: 'yeet',
    description: 'test command'
}