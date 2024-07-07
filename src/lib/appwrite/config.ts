import { Client, Account, Databases, Storage, Avatars } from "appwrite"

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

/*Account utility made for passing in the client and reference the 
account from Appwrite

It is going to allow us to deal with the auth functionalities of the Appwrite cloud.
*/  
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);