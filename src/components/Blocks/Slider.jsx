import React, { useEffect, useState, Suspense } from 'react'
import 'flickity/css/flickity.css'
const Flickity = React.lazy(() => import('react-flickity-component'))

export default function Slider({ children }) {
  const flickityOptions = {
    autoPlay: false,
    pageDots: false,
    prevNextButtons: false,
    freeScroll: false,
    wrapAround: false,
    on: {
      staticClick: function (event, pointer, cellElement, cellIndex) {
        var flkty = this
        if (!cellElement) {
          return
        }
        if (cellIndex == flkty.selectedIndex) {
          flkty.next()
        } else {
          flkty.select(cellIndex)
        }
      },
      scroll: function () {
        var flkty = this
        var docStyle = document.documentElement.style
        var transformProp = typeof docStyle.transform === 'string' ? 'transform' : 'WebkitTransform'

        this.slides.forEach(function (slide, i) {
          const img = flkty.cells[i].element.querySelector('.image')
          const x = ((slide.target + flkty.x) * -1) / 3
          // const s = slide.target + flkty.current.x;
          return (img.style[transformProp] = `translateX(${x}px)`)
        })
      }
    }
  }

  useEffect(() => {
    const loadScrollTrigger = async () => {
      const Flickity = await require('react-flickity-component')
    }

    loadScrollTrigger()
  }, []) // Empty dependency array to run this effect only once

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Flickity options={flickityOptions}>{children}</Flickity>
    </Suspense>
  )
}
