import { ID, Query } from "appwrite"
import { INewPost, INewUser } from "@/types"
import { account, appwriteConfig, avatars, databases, storage } from "./config" 

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

//Save user to database 
export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;  
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser
    } catch (error) {
        console.log(error)
    }
}

//Function for when a user signs in, this creates a session for the logged in user.
export async function signInAccount(user: { email: string; password: string;}) {
    try {  
        const session = await account.createEmailPasswordSession(user.email, user.password)

        return session
    } catch (error) {
      console.log(error) 
    }  
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current")
        return session 
    } catch (error) {
        console.log(error)
    }
}

export async function createPost(post: INewPost) {
    //Upload image to storage
    try {
        const uploadedFile = await uploadFile(post.file[0])

        if(!uploadedFile) throw Error("Failed to upload file")

        //Get file url
        const fileUrl = await getFilePreview(uploadedFile.$id)

        if(!fileUrl) {
            deleteFile(uploadedFile.$id)
            throw Error("Failed to get file URL")
        }
        
        //Convert tags into an array
        const tags = post.tags?.replace(/ /g,"").split(",") || []

        //Save post to database
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags,
            }
        )

        if(!newPost) {
            await deleteFile(uploadedFile.$id)
            throw Error
        }

        return newPost
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file,
        )

        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}

export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            'center',
            100,
        )

        return fileUrl
    } catch (error) {
        console.log(error) 
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId)

        return { status: "ok" }
    } catch (error) {
        console.log(error)
    }
}

export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc("$createdAt", Query.limit(20))]
    )

    if (!posts) throw Error
    return posts
}

export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray
            }
        )

        if (!updatedPost) throw Error

        return updatedPost
    } catch (error) {
        console.log(error)
    }  
}

export async function savePost(postId: string, userId: string[]) {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId, 
            }
        )

        if (!updatedPost) throw Error

        return updatedPost
    } catch (error) {
        console.log(error)
    }  
}

export async function deleteSavedPost(savedRecordId: string) {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId,
        )

        if (!statusCode) throw Error

        return {status: "ok"}
    } catch (error) {
        console.log(error)
    }  
}