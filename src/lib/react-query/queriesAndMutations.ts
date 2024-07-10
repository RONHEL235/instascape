import { 
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "@tanstack/react-query"
/*Initialised a new muation fuction so that now react query know what is we are doing*/
export const userCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user) 
    })
} 