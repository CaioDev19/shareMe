import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { LogIn } from "../../../interfaces/api"
import { logIn } from "../../../services/requets"

export function useLogIn(
  onSuccess: (response: AxiosResponse<LogIn>) => void,
  onError: (error: any) => void
) {
  return useMutation(logIn, {
    onSuccess,
    onError,
  })
}
