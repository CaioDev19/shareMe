import * as Sc from "./style"
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login"
import backgroundVideo from "../../assets/share.mp4"
import logoWhite from "../../assets/logowhite.png"

type GoogleResponse = GoogleLoginResponse | GoogleLoginResponseOffline

export function Login() {
  function handleLogin(googleResponse: GoogleResponse): void {
    console.log(googleResponse)
  }

  function handleError(error: any): void {
    console.log(error)
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
