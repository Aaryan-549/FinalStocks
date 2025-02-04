import React from 'react'
import Econ from './assets/ec.png'
import NewsBox from './components/NewsBox'
import Stocks from './components/Stocks'
import NewsApp from './components/NewsApp'

function Home() {
  return (
    <>
    <div className='w-screen h-full bg-[#0B091A]'>
    <img src={Econ} alt='Econ' className='w-[9%] h-auto pt-[0.3%] pl-[0.5%]' />
     <NewsApp />
    <Stocks />
    </div>
    </>
  )
}

export default Home
