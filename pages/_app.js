import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/alurakutCommons'

const GlobalStyle = createGlobalStyle`

 /* Reset CSS */

 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
 }
  body {
    font-family: sans-serif;
    background-image: url("https://criticalhits.com.br/wp-content/uploads/2020/12/cb109d5d1402ae804422a89aa168da00.jpg");
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .userFoto {
    border-radius: 50%;
    display: block;
    height: auto;
    width: auto;
    align-items: center;
    justify-content: center;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
