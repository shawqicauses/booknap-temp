import {Button, extendVariants} from "@nextui-org/react"

const MyButton = extendVariants(Button, {
  variants: {
    size: {
      xl: "px-5 py-2 min-w-unit-10 h-full text-xl gap-unit-2 rounded-small inline-flex  w-auto",
      smSquare:
        "px-unit-2 min-w-unit-10 min-h-unit-10 h-full text-small gap-unit-2 rounded-small inline-flex",
      navIcon:
        "px-unit-1 min-w-unit-10  min-h-unit-10 h-full text-small gap-unit-2 rounded-small inline-flex",
      xl2: "px-5 py-3 min-w-unit-10 h-full !text-xl gap-unit-2 rounded-small inline-flex  w-full h-full",
      tab: "py-1 px-5 inline-flex  w-full h-full"
    },
    color: {
      success: "bg-green-500 text-white",
      white: "bg-white text-black dark:bg-mirage dark:text-white",
      white2: "bg-transparent",
      primary: "text-white bg-my-primary hover:bg-[#254478]",
      primary2: "text-my-primary bg-[#E9EDF4]",
      secondary: "text-blue-300 bg-gray-200",
      gray: "",
      selectedFilter: "bg-[#E9EDF4] text-black",
      reject: "bg-[#E9EDF4] text-my-primary dark:bg-ebony-clay dark:text-white",
      offer: "bg-[#F7F7F7] dark:bg-mirage",
      transparent: "bg-transparent",
      danger: "bg-red-600 text-white",
      navIcon:
        "bg-white dark:bg-[rgb(0,8,24)] hover:bg-gray-100 dark:hover:bg-ebony-clay text-[#B9B9B9] dark:text-[#5B6C89]",
      tab: "bg-[#E3E3E3] text-[#909090]"
    }
  },
  defaultVariants: {
    color: "default",
    size: "md",
    disableAnimation: "true"
  }
})

export default MyButton
