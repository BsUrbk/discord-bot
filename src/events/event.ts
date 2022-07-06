import { PrismaClient } from "@prisma/client"

class DiscordEvent{
    private static prisma: PrismaClient = new PrismaClient()
    protected static getPrisma(){
        return this.prisma
    }
}

export default DiscordEvent