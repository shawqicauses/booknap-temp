import {Url} from "next/dist/shared/lib/router/router"
import Link from "next/link"
import React from "react"

interface IButtonProps {
  text?: string
  icon?: JSX.Element
  buttonStyle?: {type: string; other?: Array<string>}
  handleClick?: React.MouseEventHandler
  isSubmit?: boolean
  isLink?: boolean
  href?: Url
  disabled?: boolean
}
const Button = function Button({
  text,
  icon,
  buttonStyle = {type: "button-primary"},
  handleClick,
  isSubmit,
  isLink,
  href,
  disabled
}: IButtonProps) {
  const IconText = text && icon
  if (isLink) {
    return (
      <Link
        href={href ?? "/"}
        className={`button inline-block ${buttonStyle.type} 
        ${buttonStyle.other?.join(" ")} ${
          IconText ? "my-flex gap-1 items-center" : ""
        }`}
        onClick={handleClick}>
        {icon} {text}
      </Link>
    )
  }
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={`button inline-block ${buttonStyle.type} 
      ${buttonStyle.other?.join(" ")} ${IconText ? "my-flex gap-1" : ""}`}
      onClick={handleClick}
      disabled={disabled}>
      {icon} {text}
    </button>
  )
}
Button.defaultProps = {
  text: "",
  icon: null,
  buttonStyle: {type: ""},
  handleClick: () => {},
  isSubmit: false,
  isLink: false,
  href: "",
  disabled: false
}
export default Button
