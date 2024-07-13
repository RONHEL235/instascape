import { 
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query"

import { createPost, createUserAccount, signInAccount, signOutAccount } from "../appwrite/api"
import { INewPost, INewUser } from "@/types"
import { QUERY_KEYS } from "./queryKeys"


//==============================
//AUTH QUERIES
//==============================

/*Initialised a new mutation fuction so that now react query know what is we are doing*/
export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user) 
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string
            password: string     
        }) => signInAccount(user) 
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount 
    })
}

//========================
//POST QUERIES
//========================

export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}