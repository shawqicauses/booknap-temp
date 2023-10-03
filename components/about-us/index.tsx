import Image from "next/image"
import React from "react"
import {AiFillCheckCircle} from "react-icons/ai"

const AboutUsContent = function AboutUsContent() {
  return (
    <div className="pt-4 pb-10 w-full">
      <div className="my-container">
        <div className="text-center rounded-lg bg-gray-100 dark:bg-mirage p-4 pt-8 bg-[url('/mask.png')] mb-6">
          <h1 className="heading-1 text-my-primary mb-4">ABOUT US</h1>
          <p className="body dark:text-waikawa-gray">
            our company was founded in 2020. we work daily to become better and we are ready to
            share best practices.`
          </p>
        </div>
        <div className="mb-6 flex flex-col-reverse gap-4 lg:flex-row justify-between items-center">
          <div className="lg:w-2/5">
            <h2 className="heading-2 mb-4 dark:text-white">What Are BOOKNAP</h2>
            <p className="body-sm">
              lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. at vero eos et
              accusam et justo duo dolores et ea rebum. stet clita kasd gubergren, no sea takimata
              sanctus est lorem ipsum dolor sit amet. lorem ipsum dolor sit amet, consetetur
              sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. at vero eos et accusam et justo duo dolores et ea
              rebum. stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit
              amet. lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. at vero
              eos et accusam et justo lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam{" "}
            </p>
          </div>
          <div className="relative lg:w-2/5 h-full rounded-lg overflow-hidden">
            <Image src="/about-img-1.png" alt="img" fill className="!relative object-contain" />
          </div>
        </div>
        <div className="flex flex-col-reverse gap-4 lg:flex-row justify-between items-center">
          <div className="lg:w-2/5">
            <div className="mb-3">
              <h2 className="heading-2 mb-4 dark:text-white">Our goals</h2>
              <p className="body-sm">
                lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. at vero
                eos et accusam et justo duo dolores et ea rebum. stet clita kasd gubergren, no sea
                takimata sanctus est lorem ipsum dolor sit amet. lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore
              </p>
            </div>
            <div>
              <h2 className="heading-2 mb-4 dark:text-white">Lorem Ipsum is simply</h2>
              <p className="body-sm mb-2">
                lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-1">
                  <AiFillCheckCircle className="h-6 w-6 text-blue-600" />
                  <span className="inline-block body-sm text-black dark:text-white">
                    lorem ipsum dolor sit amet, consetetur
                  </span>
                </li>
                <li className="flex gap-1">
                  <AiFillCheckCircle className="h-6 w-6 text-blue-600" />
                  <span className="inline-block body-sm text-black dark:text-white">
                    lorem ipsum dolor sit amet, consetetur
                  </span>
                </li>
                <li className="flex gap-1">
                  <AiFillCheckCircle className="h-6 w-6 text-blue-600" />
                  <span className="inline-block body-sm text-black dark:text-white">
                    lorem ipsum dolor sit amet, consetetur
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative lg:w-2/5 h-full rounded-lg overflow-hidden">
            <Image src="/about-img-2.png" alt="img" fill className="!relative object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsContent
