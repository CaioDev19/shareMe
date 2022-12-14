import { GlobalStyles } from "./global/styles/GlobalStyles"
import { ThemeProvider } from "styled-components"
import { theme } from "./global/theme"
import { Login } from "./pages/Login"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Login />
    </ThemeProvider>
  )
}

export default App
