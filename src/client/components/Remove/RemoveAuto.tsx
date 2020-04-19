import React, { Fragment } from 'react'
import NavigationBar from '../NavigationBar'
import RemoveForm from './RemoveForm'

const RemoveAuto = () => {
  return (
    <Fragment>
      <NavigationBar />
        <h1>Auto Remove</h1>
        <RemoveForm />
    </Fragment>
  )
}

export default RemoveAuto
