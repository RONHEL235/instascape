import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"

// Define props for PostForm, including an optional post and an action ("Create" or "Update")
type PostFormProps = {
    post?: Models.Document // Optional post object for editing
    action: "Create" |"Update" // Action type for form submission
}

const PostForm = ({ post, action }: PostFormProps) => {
  // Mutation hooks for creating and updating posts
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost()
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost()


  const { user } = useUserContext()
  const { toast } = useToast()
  const navigate = useNavigate() 

  // Initialize the form with default values and validation schema
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    // Handle post update
    if(post && action === "Update") {
      const updatedPost = await updatePost({
        ...values, 
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      })

      // If update fails, show an error toast
      if(!updatedPost) {
        toast({title: "Please try again"})
      }
      // Navigate to the updated post's page
      return navigate(`/post/${post.$id}`)
    }
    
    // Handle post creation
    const newPost = await createPost({
        ...values,
        userId: user.id,// Associate the new post with the current user
    })
    
    if(!newPost) {
        toast({
            title: "Please try again"
        })
    }

    navigate("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex-col gap-8 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file" 
          render={({ field }) => (
            <FormItem className="py-4">
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location" 
          render={({ field }) => (
            <FormItem className="py-4">
              <FormLabel className="shad-form_label">Add location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags" 
          render={({ field }) => (
            <FormItem className="py-4">
              <FormLabel className="shad-form_label py-8" >Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input 
                    type="text" 
                    className="shad-input"
                    placeholder="Love, Learning, Consistency,   Discipline (modus)"
                    {...field}
               />
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <div className="flex p-4 gap-4 items-center justify-end ">
            <Button 
                type="button"
                className="shad-button_dark_4"
                >
                    Cancel
            </Button>
            <Button 
                type="submit"
                className="bg-rose-dark whitespace-nowrap"
                disabled={isLoadingCreate || isLoadingUpdate}
            >
                {isLoadingCreate || isLoadingUpdate && "Loading..."}
                {action} Post
            </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm