import * as Sc from "./style"
import { GoogleLogin } from "react-google-login"
import backgroundVideo from "../../assets/share.mp4"
import logoWhite from "../../assets/logowhite.png"
import { useNavigate, Navigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"

export function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useUser()

  function handleLogin(googleResponse: any): void {
    setUser(googleResponse.profileObj)
    navigate("/home")
  }

  function handleError(error: any) {
    console.log(error)
  }

  if (user) {
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
