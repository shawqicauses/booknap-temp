// DONE REVIEWING: GITHUB COMMIT
import Link, {LinkProps} from "next/link"
import {
  AnchorHTMLAttributes,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  RefAttributes,
  createElement
} from "react"

interface IAttributes extends LinkProps {
  type?: string
  className?: string
}

interface IButtonWrapperProps {
  tag?:
    | keyof JSX.IntrinsicElements
    | ForwardRefExoticComponent<
        Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
          LinkProps &
          RefAttributes<HTMLAnchorElement>
      >
  children: ReactNode
  attributes: IAttributes
}

export const ButtonWrapper = function ButtonWrapper({
  tag: Wrapper = "button",
  children,
  attributes
}: IButtonWrapperProps) {
  return createElement(Wrapper, attributes, children)
}

ButtonWrapper.defaultProps = {tag: "button"}

interface IButtonProps {
  isSubmit?: boolean
  isLink?: boolean
  href?: string
  style?: {
    type?: string
    iconColor?: string
    textColor?: string
    other?: string
  }
  icon?: ReactElement
  text?: string
  handleClick?: any
}

const Button = function Button({
  isSubmit,
  isLink,
  href,
  style,
  icon,
  text,
  handleClick
}: IButtonProps) {
  const attributes: IAttributes = {href: href || "#"}
  const classes = ["my-flex button"]

  if (!isLink) attributes.type = isSubmit ? "submit" : "button"
  if (style?.type) classes.push(style.type)
  else classes.push("button-primary")
  if (style?.other) classes.push(style?.other)
  if (icon) classes.push("gap-3")
  attributes.className = classes.join(" ")
  if (handleClick) attributes.onClick = handleClick
  return (
    <ButtonWrapper tag={isLink ? Link : "button"} attributes={attributes}>
      {icon ? (
        <span className={style?.iconColor || "text-current"}>{icon}</span>
      ) : null}
      {text ? (
        <span className={style?.textColor || "text-current"}>{text}</span>
      ) : null}
    </ButtonWrapper>
  )
}

Button.defaultProps = {
  isSubmit: false,
  isLink: false,
  href: null,
  style: null,
  icon: null,
  text: null,
  handleClick: () => {}
}

export default Button
