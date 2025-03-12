import { useState, useEffect } from 'react'
import { BrowserRouter, data, Routes } from 'react-router-dom'
import './Homepage.css'
import SubscriptionsContainer from '../SubscriptionContainer/Subscriptionscontainer'
import NavBar from '../NavBar/NavBar'

function Homepage() {

  return (
    <div>
        <NavBar/>
        <SubscriptionsContainer />
    </div>
  )
}

export default Homepage