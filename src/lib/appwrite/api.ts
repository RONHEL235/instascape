import { ID } from "appwrite"; 
import { INewUser } from "@/types";
import { account } from "./config";
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
 
        return newAccount
    } catch (error) { 
        console.log(error);
        return error;
    }
}