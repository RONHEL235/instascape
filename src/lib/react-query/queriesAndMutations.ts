import { 
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query"

import { createUserAccount, signInAccount } from "../appwrite/api"
import { INewUser } from "@/types"

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
        mutationFn: () => signOutAccount(user) 
    })
}