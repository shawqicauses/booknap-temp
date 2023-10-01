const closeButton =
  "hover:bg-white/50 active:bg-white/10 bg-white/70 rounded-lg z-10 top-3 right-3 dark:hover:bg-ebony-clay dark:bg-mirage"
const normal = {
  body: "py-6",
  backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
  base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
  header: "border-b-[1px] border-[#292f46]",
  footer: "border-t-[1px] border-[#292f46]",
  closeButton: "hover:bg-white/5 active:bg-white/10"
}
const noPadding = {
  body: "p-0",
  backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
  base: "max-w-sm",
  closeButton: closeButton
}

const type3 = {
  body: "px-10 bg-[#F5F5F5] dark:bg-blue-charcoal",
  backdrop: "bg-[#292f46]/50 backdrop-opacity-40 ",
  base: "max-w-lg bg-[#F5F5F5] dark:bg-blue-charcoal",
  closeButton: closeButton
}
const type4 = {
  body: "px-3 dark:bg-blue-charcoal",
  backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
  base: "max-w-lg",
  closeButton: closeButton
}
const type5 = {
  body: "px-3 dark:bg-blue-charcoal",
  backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
  closeButton: closeButton
}
export {noPadding, normal, type3, type4, type5}
