import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { useLoggedUser } from "../../useLoggedUser"
import { Posts, Post } from "../../../interfaces/api"
import { deletePost } from "../../../services/requets"
import { AxiosResponse } from "axios"

export const useDeletePost = (id: number) => {
  const queryClient = useQueryClient()
  const { user } = useLoggedUser()
  return useMutation(deletePost, {
    onMutate: async () => {
      await queryClient.cancelQueries(["posts", user.userData.id])
      await queryClient.cancelQueries(["posts"])

      const previousUserPosts = queryClient.getQueryData([
        "posts",
        user.userData.id,
      ])
      const previousPosts = queryClient.getQueryData(["posts"])

      interface Page {
        pagesParam: Array<string | undefined>
        pages: AxiosResponse<Posts>[]
      }

      function deletePostFromPages(oldData: Page | undefined) {
        if (!oldData) {
          return undefined
        }

        for (let page of oldData.pages) {
          const posts: Post[] = page.data.results.filter(
            (p: Post) => p.id !== id
          )

          page.data.results = posts
        }

        return oldData
      }
      queryClient.setQueryData(
        ["posts", user.userData.id],
        deletePostFromPages
      )

      queryClient.setQueryData(["posts"], deletePostFromPages)

      return { previousUserPosts, previousPosts }
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        ["posts", user.userData.id],
        context?.previousUserPosts
      )
      queryClient.setQueryData(["posts"], context?.previousPosts)
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts", user.userData.id])
      queryClient.invalidateQueries(["posts"])
    },
  })
}
