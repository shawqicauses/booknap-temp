import {Button, extendVariants} from "@nextui-org/react"

const MyButton = extendVariants(Button, {
  variants: {
    size: {
      sm: "px-2 py-2 min-w-unit-10 h-full text-sm gap-unit-2 rounded-small inline-flex  font-light",
      md: "px-5 py-2 min-w-unit-10 h-full text-md gap-unit-2 rounded-small inline-flex",
      lg: "px-5 py-2 min-w-unit-10 h-full text-lg gap-unit-2 rounded-small inline-flex",
      xl: "px-5 py-2 min-w-unit-10 h-full text-xl gap-unit-2 rounded-small inline-flex"
    },
    color: {
      white: "bg-white text-blcak",
      primary: "text-white bg-[#2F5597]",
      secondary: "text-blue-300 bg-gray-200",
      gray: "",
      selectedFilter: "bg-[#E9EDF4] text-black",
      regect: "bg-[#E9EDF4] text-[#2F5597]",
      offer: "bg-[#F7F7F7]",
      transparent: "bg-transparent"
    }
  },
  defaultVariants: {
    color: "default",
    size: "md"
  }
})

export default MyButton
