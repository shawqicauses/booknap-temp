import {Button, extendVariants} from "@nextui-org/react"

const MyButton = extendVariants(Button, {
  variants: {
    size: {
      xl: "px-5 py-2 min-w-unit-10 h-full text-xl gap-unit-2 rounded-small inline-flex  w-auto",
      smSquare:
        "px-unit-2 min-w-unit-10 min-h-unit-10 h-full text-small gap-unit-2 rounded-small inline-flex"
    },
    color: {
      white: "bg-white text-blcak",
      primary: "text-white bg-[#2F5597]",
      primary2: "text-[#2F5597] bg-[#E9EDF4]",
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
