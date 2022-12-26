import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { createPost } from "../../services/api"
import { useQueryClient } from "@tanstack/react-query"
import { useUser } from "../useUser"

export function useCreatePost() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { user } = useUser()

  return useMutation(createPost, {
    onSuccess: () => {
      navigate("/home")
      queryClient.invalidateQueries(["posts"])
      queryClient.invalidateQueries(["post", user.userData.id])
    },
  })
}
