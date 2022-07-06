import { GuildMember } from "discord.js"
import MemberEvents from "../events/member.events"

class EventHandler{
    public async getMember(member: GuildMember){
        const user = await MemberEvents.getUser(member.toString()).catch(undefined)
        return user
    }

    public async createMemberProfile(member: GuildMember){
        const userExists = await MemberEvents.getUser(member.toString()).catch(undefined)
        const user = userExists ? await new MemberEvents(member.toString()).createUser() : undefined

        return user
    }
}

export default EventHandler