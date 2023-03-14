import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { checkboxTheme } from '@/components/Checkbox'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  colors:{
    main:{
      blue:"hsl(220, 98%, 61%)",
      check:"linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
    },
    light:{
      lightGray:"hsl(0, 0%, 98%)",
      paleGrayBlue:"hsl(236, 33%, 92%)",
      lightGrayBlue:"hsl(233, 11%, 84%)",
      darkGrayBlue:"hsl(236, 9%, 61%)",
      blackGrayBlue:"hsl(235, 19%, 35%)"
    },
    dark:{
      darkBlue:"hsl(235, 21%, 11%)",
      desaturatedBlue:"hsl(235, 24%, 19%)",
      grayBlue:"hsl(234, 39%, 85%)",
      grayBlueHover:"hsl(236, 33%, 92%)",
      darkGrayBlue:"hsl(234, 11%, 52%)",
      veryGray1:"hsl(233, 14%, 35%)",
      veryGray2:"hsl(237, 14%, 26%)"
    }
  },
  components: { Checkbox: checkboxTheme },
  breakpoints:{
    sm:"376px",
    md:"426px",
    lg:"769px",
    xl:"1025px"
  },
  styles:{
    global:(props:StyleFunctionProps) => ({
      body:{
        bg: mode("hsl(236, 33%, 92%)","hsl(235, 21%, 11%)")(props),
      }
    })
  }
})
export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}
