import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { logIn, LogIn } from "../../services/api"

export function useLogIn(
  onSuccess: (response: AxiosResponse<LogIn>) => void,
  onError: (error: any) => void
) {
  return useMutation(logIn, {
    onSuccess,
    onError,
  })
}
