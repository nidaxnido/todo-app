import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const circular = definePartsStyle({
  control: defineStyle({
    rounded: "full",
    _checked: {
      bg: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      borderColor: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      

      _hover: {
        bg: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
        borderColor: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      },

      _disabled: {
        borderColor: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
        bg: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      
      },
    },

    _indeterminate: {
      bg: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      borderColor: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",

      _hover: {
        bg: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
        borderColor: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      },
      
    },
    _disabled: {
      bg: "transparent",
      borderColor: "gray.700",
    },

  })
})

export const checkboxTheme = defineMultiStyleConfig({
  variants: { circular },
})