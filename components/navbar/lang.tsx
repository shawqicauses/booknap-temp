import React, {useEffect, useState} from "react"
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  extendVariants
} from "@nextui-org/react"
import "flag-icons/css/flag-icons.min.css"

const languages = [
  {id: 0, shortname: "en", name: "English", flag: "us"},
  {id: 1, shortname: "ar", name: "Arabic", flag: "eg"}
]

const MyButton = extendVariants(Button, {
  variants: {
    size: {
      md: "px-unit-2 min-w-unit-10 h-full text-small gap-unit-2 rounded-small inline-flex bg-gray-100"
    }
  },
  defaultVariants: {
    color: "default",
    size: "md"
  }
})

const Lang = function Lang() {
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0])
  const [showChild, setShowChild] = useState(false)
  const selectedValue = React.useMemo(
    () => selectedLanguage,
    [selectedLanguage]
  )

  const handleSelectionChange = (language: any) => {
    const set: string = Array.from(language)[0] as string
    setSelectedLanguage(languages[parseInt(set, 10)])
  }
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <MyButton
          variant="bordered"
          className="capitalize h-full border-0"
          startContent={
            <span className={`fi fi-${selectedValue.flag} fis h-full`} />
          }>
          {selectedValue.name}
        </MyButton>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection actions"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[selectedLanguage.id]}
        onSelectionChange={handleSelectionChange}>
        {languages.map((language) => (
          <DropdownItem
            key={language.id}
            startContent={
              <span className={`fi fi-${language.flag} fis h-full`} />
            }>
            {language.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default Lang
