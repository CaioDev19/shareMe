import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { logIn, UserApi } from "../../services/api"

export function useLogIn(
  onSuccess: (response: AxiosResponse<UserApi>) => void,
  onError: (error: any) => void
) {
  return useMutation(logIn, {
    onSuccess,
    onError,
  })
}
