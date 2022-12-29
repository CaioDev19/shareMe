import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { makeComment } from "../../services/api"

export function useCreateComment(id: string) {
  const queryClient = useQueryClient()

  return useMutation(makeComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id])
    },
  })
}
