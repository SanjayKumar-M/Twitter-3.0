import React from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

const style = {
    wrapper: `h-[20rem] w-[35rem] text-white bg-[#15202b] rounded-3xl p-10 flex flex-col items-center justify-center`,
    title: `font-semibold text-xl mb-6`,
    closeButton: `mt-6 bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  }
  
function Finishedstate() {
    const router = useRouter()
    const { getCurrentUserDetails } = useContext(TwitterContext)

    useEffect(() => {
        getCurrentUserDetails()
    })

    return (
        <div className={style.wrapper}>
            <div className={style.title}>Minting Successful!</div>
            <img src='https://flyclipart.com/thumb2/verify-success-success-tick-icon-with-png-and-vector-format-372259.png' alt='checkmark' height={100} width={100} />
            <div onClick={() => router.push('/')} className={style.closeButton}>
                Close
            </div>
        </div>
    )
}

export default Finishedstate

//https://flyclipart.com/thumb2/verify-success-success-tick-icon-with-png-and-vector-format-372259.png