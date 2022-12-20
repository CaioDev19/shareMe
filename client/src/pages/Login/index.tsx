import * as Sc from "./style"
import { GoogleLogin } from "react-google-login"
import backgroundVideo from "../../assets/share.mp4"
import logoWhite from "../../assets/logowhite.png"
import { useNavigate, Navigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { useMutation } from "@tanstack/react-query"
import * as api from "../../services/api"

export function Login() {
  const navigate = useNavigate()
  const { user, setUser } = useUser()

  const { mutate } = useMutation(api.logIn, {
    onSuccess: (response) => {
      setUser({
        userData: response.data.user,
        token: response.data.token,
      })
      navigate("/home")
    },
    onError: () => {
      navigate("/login")
    },
  })

  function handleLogin(googleResponse: any): void {
    interface Iuser {
      id: string
      image: string
      name: string
      email: string
    }

    const newUser: Iuser = {
      id: googleResponse.profileObj.googleId,
      image: googleResponse.profileObj.imageUrl,
      name: googleResponse.profileObj.name,
      email: googleResponse.profileObj.email,
    }

    mutate(newUser)
  }

  function handleError(error: any): void {
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
          onFailure={handleError}
          cookiePolicy="single_host_origin"
        />
      </Sc.Container>
    </>
  )
}