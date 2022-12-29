import { GlobalStyles } from "./global/styles/GlobalStyles"
import { ThemeProvider } from "styled-components"
import { theme } from "./global/theme"
import { gapi } from "gapi-script"
import { useEffect } from "react"
import { MainRoutes } from "./routes/MainRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import { UserProvider } from "./context/User"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
})

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <UserProvider>
            <MainRoutes />
          </UserProvider>
        </ThemeProvider>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
