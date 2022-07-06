import { GuildMember } from "discord.js"
import DiscordEvent from "./event"
import prismaException from "../exceptions/prisma.exception"

class MemberEvents extends DiscordEvent{
    constructor(private discordId: string){super()}

    public async createUser(){
        const prisma = DiscordEvent.getPrisma()

        const user = await prisma.user.create({
            data: {
                discord_id: this.discordId
            }
        }).catch(err => { throw new prismaException(err) })
        return user
    }

    public static async getUser(discordId: string){
        const prisma = DiscordEvent.getPrisma()

        const user = await prisma.user.findUnique({
            where: { discord_id: discordId }, 
            select: {
                createdAt: true,
                level: true,
                xp_total: true}}).catch(err => { throw new prismaException(err)})
        console.log(user)
        return user
    }
}

export default MemberEvents