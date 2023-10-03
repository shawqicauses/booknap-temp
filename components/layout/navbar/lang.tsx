import React, {useEffect, useState} from "react"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react"
import "flag-icons/css/flag-icons.min.css"

const languages = [
  {id: 0, shortname: "en", name: "EN", flag: "us"},
  {id: 1, shortname: "ar", name: "AR", flag: "eg"}
]

const Lang = function Lang() {
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0])
  const [showChild, setShowChild] = useState(false)
  const selectedValue = React.useMemo(() => selectedLanguage, [selectedLanguage])

  const handleSelectionChange = (language: any) => {
    const set: string = Array.from(language)[0] as string
    setSelectedLanguage(languages[parseInt(set, 10)])
  }
  useEffect(() => {
    setShowChild(true)
  }, [])

  return showChild ? (
    <Dropdown size="sm" className="px-0 py-2 dark:bg-mirage" classNames={{backdrop: "w-10"}}>
      <DropdownTrigger>
        <div className="flex gap-2 items-center hover:bg-gray-100 dark:hover:bg-ebony-clay text-[#B9B9B9]  h-full dark:text-waikawa-gray py-2 px-2.5 rounded-lg cursor-pointer">
          <span className="block">{selectedValue.name}</span>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection actions"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[selectedLanguage.id]}
        onSelectionChange={handleSelectionChange}
        className="p-0 py-1">
        {languages.map((language) => (
          <DropdownItem
            key={language.id}
            className="hover:bg-gray-100 dark:hover:bg-slate-800 !rounded-none"
            startContent={<span className={`fi fi-${language.flag} fis h-full`} />}>
            {language.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  ) : null
}

export default Lang
