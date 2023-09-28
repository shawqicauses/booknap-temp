// DONE REVIEWING: GITHUB COMMIT
// import Image from "next/image"
import Image from "next/image"
import {ReactElement} from "react"

interface IStateProps {
  image?: string
  title: string
  description: string | ReactElement
}

const State = function State({
  image,
  title,
  description
}: IStateProps): ReactElement {
  return (
    <div className="my-flex mx-auto max-w-lg flex-col my-5">
      {image ? (
        <Image src={image} alt={title} fill className="!static mb-3 max-w-xs" />
      ) : null}
      <h3 className="heading-3 mb-2 dark:text-white">{title}</h3>
      <p className="body-sm text-center">{description}</p>
    </div>
  )
}

State.defaultProps = {
  image: null
}
export default State
