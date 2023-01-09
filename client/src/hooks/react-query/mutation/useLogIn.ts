import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { LogIn, useRequests } from "../../useRequests"

export function useLogIn(
  onSuccess: (response: AxiosResponse<LogIn>) => void,
  onError: (error: any) => void
) {
  const { logIn } = useRequests()
  return useMutation(logIn, {
    onSuccess,
    onError,
  })
}
