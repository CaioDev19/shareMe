import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { logIn, UserApi } from "../../services/api"

export function useLogIn(
  handleSucess: (response: AxiosResponse<UserApi>) => void,
  handleError: (error: any) => void
) {
  return useMutation(logIn, {
    onSuccess: (data) => {
      handleSucess(data)
    },
    onError: (error) => {
      handleError(error)
    },
  })
}
