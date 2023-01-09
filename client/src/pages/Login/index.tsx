import * as Sc from "./style"
import { GoogleLogin } from "react-google-login"
import backgroundVideo from "../../assets/share.mp4"
import logoWhite from "../../assets/logowhite.png"
import { useNavigate, Navigate } from "react-router-dom"
import { useLoggedUser } from "../../hooks/useLoggedUser"
import { LogIn } from "../../hooks/useRequests"
import { AxiosResponse } from "axios"
import { useLogIn } from "../../hooks/react-query/mutation/useLogIn"
import { User } from "../../hooks/useRequests"

export function Login() {
  const navigate = useNavigate()
  const { user, setUser } = useLoggedUser()

  function onSucess(response: AxiosResponse<LogIn>): void {
    setUser({
      userData: response.data.user,
      token: response.data.token,
    })
    navigate("/home")
  }

  function onError(error: AxiosResponse<{ message: string }>): void {
    console.log(error.data.message)
  }

  const { mutate } = useLogIn(onSucess, onError)

  function handleLogin(googleResponse: any): void {
    const newUser: User = {
      id: googleResponse.profileObj.googleId,
      image: googleResponse.profileObj.imageUrl,
      name: googleResponse.profileObj.name,
      email: googleResponse.profileObj.email,
    }

    mutate(newUser)
  }

  function handleGoogleError(error: any): void {
    console.log(error)
  }

  if (user.token) {
    return <Navigate to="/home" />
  }

  return (
    <>
      <Sc.OverLay />
      <Sc.Video
        src={backgroundVideo}
        loop
        autoPlay
        muted
        controls={false}
      />
      <Sc.Container>
        <Sc.Logo src={logoWhite} alt="logo" />
        <GoogleLogin
          clientId={`${process.env.REACT_APP_CLIENT_ID}`}
          buttonText="Login com Google"
          onSuccess={handleLogin}
          onFailure={handleGoogleError}
          cookiePolicy="single_host_origin"
        />
      </Sc.Container>
    </>
  )
}
