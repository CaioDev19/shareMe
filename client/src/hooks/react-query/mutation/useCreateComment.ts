import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { createComment } from "../../../services/requets"

export function useCreateComment(id: string) {
  const queryClient = useQueryClient()

  return useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id])
    },
  })
}
