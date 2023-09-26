import {Button, extendVariants} from "@nextui-org/react"

const MyButton = extendVariants(Button, {
  variants: {
    size: {
      xl: "px-5 py-2 min-w-unit-10 h-full text-xl gap-unit-2 rounded-small inline-flex  w-auto",
      smSquare:
        "px-unit-2 min-w-unit-10 min-h-unit-10 h-full text-small gap-unit-2 rounded-small inline-flex",
      navIcon:
        "px-unit-1 min-w-unit-10  min-h-unit-10 h-full text-small gap-unit-2 rounded-small inline-flex",
      xl2: "px-5 py-3 min-w-unit-10 h-full !text-xl gap-unit-2 rounded-small inline-flex  w-full h-full"
    },
    color: {
      success: "bg-green-500 text-white",
      white: "bg-white text-black dark:bg-mirage dark:text-white",
      white2: "bg-transparent",
      primary: "text-white bg-[#2F5597]",
      primary2: "text-[#2F5597] bg-[#E9EDF4]",
      secondary: "text-blue-300 bg-gray-200",
      gray: "",
      selectedFilter: "bg-[#E9EDF4] text-black",
      reject: "bg-[#E9EDF4] text-[#2F5597] dark:bg-ebony-clay dark:text-white",
      offer: "bg-[#F7F7F7] dark:bg-mirage",
      transparent: "bg-transparent",
      danger: "bg-red-600 text-white",
      navIcon:
        "bg-[#F7F7F7] text-[#B9B9B9] dark:bg-[#12213B] dark:text-[#5B6C89]"
    }
  },
  defaultVariants: {
    color: "default",
    size: "md",
    disableAnimation: "true"
  }
})

export default MyButton
