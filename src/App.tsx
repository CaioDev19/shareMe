import { GlobalStyles } from "./global/styles/GlobalStyles"
import { ThemeProvider } from "styled-components"
import { theme } from "./global/theme"
import { gapi } from "gapi-script"
import { useEffect } from "react"
import { MainRoutes } from "./routes/MainRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import { UserProvider } from "./context/User"

function App() {
  useEffect(() => {
    function start(): void {
      gapi.auth2.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: "",
      })
    }

    gapi.load("client:auth2", start)
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <UserProvider>
          <MainRoutes />
        </UserProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
