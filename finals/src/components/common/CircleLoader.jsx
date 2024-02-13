import React from 'react'
import { Circles } from 'react-loader-spinner'

const CircleLoader = () => {
  return (
    <Circles
      height="20"
      width="20"
      color="rgb(136, 136, 255)"
      ariaLabel="circles-loading"
      visible={true}
    />
  )
}

export default CircleLoader