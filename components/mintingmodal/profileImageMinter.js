import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { TwitterContext } from '../../context/TwitterContext'
import Initialstate from './Initialstate'
import Loadingstate from './Loadingstate'
import { pinJSONToIPFS, pinFileToIPFS } from '../../lib/pinata'
import Finishedstate from './Finishedstate'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../../lib/Constant'
import { client } from '../../lib/client'

let metamask
if (typeof window !== 'undefined') {
    metamask = window.ethereum
}

const getEthereumContract = async () => {
    if (!metamask) return
    const provider = new ethers.providers.Web3Provider(metamask)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer,
    )

    return transactionContract
}

function ProfileImageMinter() {
    const { currentAccount, setAppStatus } = useContext(TwitterContext)
    const router = useRouter()
    const [profileImage, setProfileImage] = useState()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('initial')
    const mint = async () => {
        if (!name || !description || !profileImage) return
        setStatus('loading')

        const pinataMetaData = {
            name: `${name} - ${description}`,
        }
        const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetaData)
        await client
            .patch(currentAccount)
            .set({ profileImage: ipfsImageHash })
            .set({ isProfileImageNft: true })
            .commit()

        const imageMetaData = {
            name: name,
            description: description,
            image: `ipfs://${ipfsImageHash}`,
        }
        const ipfsJsonHash = await pinJSONToIPFS(imageMetaData)

        const contract = await getEthereumContract()
        const transactionParameters = {
            to: contractAddress,
            from: currentAccount,
            data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
        }
        try {
            await metamask.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            })

            setStatus('finished')
        } catch (error) {
            console.log(error)
            setStatus('finished')
        }
    }



    const modalChildren = (modalStatus = status) => {
        switch (modalStatus) {
            case 'initial':
                return (
                    <Initialstate
                        profileImage={profileImage}
                        setProfileImage={setProfileImage}
                        name={name}
                        setName={setName}
                        description={description}
                        setDescription={setDescription}
                        mint={mint}

                    />
                )

            case 'loading':
                return <Loadingstate />

            case 'finished':
                return <Finishedstate />

            default:
                router.push('/')
                setAppStatus('error')
                break
        }
    }

    return <>{modalChildren()}</>
}

export default ProfileImageMinter