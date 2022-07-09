import React from 'react'
import { ConnectButton } from 'web3uikit'

const header = () => {
  return(
   <nav className= "p-5 border-b-2 flex flex-row">
   <h1 className='py-4 px-4 font-bold text-3xl'>Staking App</h1>
   <div className='ml-auto py-2 px-4'>
    <ConnectButton moralisAuth={false}/>
    </div>
   </nav>
  )
}

export default header