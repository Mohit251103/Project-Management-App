import React from 'react'
import Navbar from './Navbar'
import { useUser } from '../lib/context/user'
import Projects from './Projects';

const Home = () => {
  const user = useUser();

  return (
    <>
        <Navbar/>
        <Projects/>
    </>
  )
}

export default Home