import React from 'react'
import Econ from './assets/ec.png'
import NewsBox from './components/NewsBox'
import Stocks from './components/Stocks'

import RoundNews from './components/newsfetch';
import PinBoard from './components/PinBoard'
// import FetchData from "./fetch";

function Home() {
  return (
    <>
    <div className='w-screen h-full bg-[#0B091A] overflow-x-hidden'>
    <img src={Econ} alt='Econ' className='w-[20%] h-auto pt-[0.3%] pl-[0.5%]' />
    <PinBoard />
    <RoundNews /> {/* Render NewsBox which will fetch and display round 1 news */}
    <Stocks />
    
    
    </div>
    </>
  )
}

export default Home
