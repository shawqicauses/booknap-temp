const closeButton =
  "hover:bg-white/50 active:bg-white/10 bg-white/70 rounded-lg z-10 top-3 right-3 dark:hover:bg-ebony-clay dark:bg-mirage"
const noPadding = {
  body: "p-0 bg-gray-100 dark:bg-blue-charcoal rounded-lg overflow-hidden",
  backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
  base: "bg-gray-100 dark:bg-blue-charcoal",
  closeButton: closeButton
}

const type3 = {
  body: "px-10 bg-white dark:bg-blue-charcoal",
  backdrop: "bg-[#292f46]/50 backdrop-opacity-40 ",
  base: "bg-white dark:bg-blue-charcoal",
  closeButton: closeButton
}

const type5 = {
  body: "px-3 dark:bg-blue-charcoal",
  backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
  closeButton: closeButton
}
export {noPadding, type3, type5}
