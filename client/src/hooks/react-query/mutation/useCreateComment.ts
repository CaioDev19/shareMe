import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { useRequests } from "../../useRequests"

export function useCreateComment(id: string) {
  const { createComment } = useRequests()
  const queryClient = useQueryClient()

  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id])
    },
  })
}
