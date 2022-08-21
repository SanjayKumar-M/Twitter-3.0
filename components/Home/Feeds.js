import React from 'react'
import { BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox';
import Post from '../Post'
import { useContext, useState, useEffect } from 'react';
import { TwitterContext } from '../../context/TwitterContext';

const style = {
    wrapper: `flex-[2] border-r border-l border-[#38444d]`,
    header: `sticky top-0 bg-[black] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
}


const tweets = [
    {
        displayName: 'sanjay',
        userName: '0xF75362E0484D6B1A50cb723143C0344ca2a04465',
        avatar: 'https://avatars.githubusercontent.com/u/72302495?v=4',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2020-06-01T12:00:00.000Z', 
    },
    {
        displayName: 'Sanjay',
        userName: '0xF75362E0484D6B1A50cb723143C0344ca2a04465',
        avatar: 'https://avatars.githubusercontent.com/u/72302495?v=4',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2020-06-01T12:00:00.000Z', 
    },
    {
        displayName: 'Sanjay',
        userName: '0xF75362E0484D6B1A50cb723143C0344ca2a04465',
        avatar: 'https://avatars.githubusercontent.com/u/72302495?v=4',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2020-06-01T12:00:00.000Z', 
    },
    {
        displayName: 'Sanjay',
        userName: '0xF75362E0484D6B1A50cb723143C0344ca2a04465',
        avatar: 'https://avatars.githubusercontent.com/u/72302495?v=4',
        text: 'gm',
        isProfileImageNft: false,
        timestamp: '2020-06-01T12:00:00.000Z', 
    },
]

function Feed() {
    const { currentUser } = useContext(TwitterContext)
    const [tweets, setTweets] = useState([
        {
            timestamp: '',
            tweet: '',
        },
    ])
    const [author, setAuthor] = useState({
        name: '',
        profileImage: '',
        walletAddress: '',
        isProfileImageNft: undefined,
    })

    useEffect(() => {
        if (!currentUser) return

        setTweets(currentUser.tweets)
        setAuthor({
            name: currentUser.name,
            profileImage: currentUser.profileImage,
            walletAddress: currentUser.walletAddress,
            isProfileImageNft: currentUser.isProfileImageNft,
        })
    }, [currentUser])

    return (
        <div className={`${style.wrapper} no-scrollbar`}>
            <div className={style.header}>
                <div className={style.headerTitle}>Home</div>
                <BsStars />
            </div>
            <TweetBox />
            {tweets?.map((tweet, index) => (
                <Post
                    key={index}
                    displayName={author.name === 'Unnamed'
                        ? `${author.walletAddress.slice(
                            0,
                            4,
                        )}...${author.walletAddress.slice(41)}`
                        : author.name}
                    userName={'0xf7...465'}
                    avatar={author.profileImage}
                    text={tweet.tweet}
                    isProfileImageNft={author.profileImage}
                    timestamp={tweet.timestamp}
                />
            ))}
        </div>
    )

}

export default Feed