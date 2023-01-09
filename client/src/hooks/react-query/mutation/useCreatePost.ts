import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { useLoggedUser } from "../../useLoggedUser"
import { createPost } from "../../../services/requets"

export function useCreatePost() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { user } = useLoggedUser()

  return useMutation(createPost, {
    onSuccess: () => {
      navigate("/home")
      queryClient.invalidateQueries(["posts"])
      queryClient.invalidateQueries(["post", user.userData.id])
    },
  })
}
