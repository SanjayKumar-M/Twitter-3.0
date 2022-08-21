import Sidebar from "../components/Sidebar"
import dynamic from 'next/dynamic';
import Widgets from "../components/Widgets"
import Feeds from "../components/Home/Feeds"
import {TwitterContext,TwitterProvider} from "../context/TwitterContext"
import { useContext } from "react"
import Image from "next/image"
import './/Metamask.png'


const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[black] text-white`,
  content: `max-w-[1400px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`,
}
const Home = () => {
  const {appStatus, connectWallet} = useContext(TwitterContext)

  const app = (status = appStatus) => {

    switch (status) {
      case 'connected':
        return userLoggedIn

      case 'notConnected':
        return noUserFound

      case 'noMetaMask':
        return noMetaMaskFound

      case 'Error':
        return error

      default:
        return loading
    }
  }

  const userLoggedIn = (
    <div className={style.content}>
      <Sidebar />
      <Feeds />
      <Widgets />
    </div>
  )

  const noUserFound = (
    <div className={style.loginContainer}>
      <img src={'https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png'} height={200} width={200} />
      <div
        className={style.walletConnectButton}
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </div>
      <div className={style.loginContent}> </div>
    </div>
  )
  //
  const noMetaMaskFound = (
    <div className={style.loginContainer}>
      <img src={'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png'} height={200} width={200} />
      <div>
        <a
          target="_blank"
          rel='noreferrer'
          href={`https://metamask.io/download/`}
          className={style.loginContent}
        >
          You must install Metamask, a <br /> virtual Ethereum wallet, in your browser.
        </a>
      </div>
    </div>
  )

  const error = (
    <div className={style.loginContainer}>
      <img src={'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png'} height={200} width={200} />
      <div className={style.loginContent}>
        An Error occurred. please try again later or use another browser
      </div>
    </div>
  )

  const loading = (
    <div className={style.loginContainer}>
      <div className={style.content}> Loading...</div>
    </div>
  )
  return (
    <div className={style.wrapper}>
      {app(appStatus)}
    </div>
  )
}

export default Home
