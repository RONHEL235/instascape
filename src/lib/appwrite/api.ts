import { ID } from "appwrite"
import { INewUser } from "@/types"
import { account, avatars } from "./config"
//Gets the user as a parameter and do something with the user.
//Calling the function within our form. 
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw Error

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl, 
        })
 
        return newUser
    } catch (error) { 
        console.log(error) 
        return error
    }
}

export async function saveUserToDB(user: {
    accountId: string
    email: string
    name: string
    imageUrl: URL
    username?: string  
}) {

}