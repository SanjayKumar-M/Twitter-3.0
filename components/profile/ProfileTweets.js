import React from 'react'
import Post from '../Post'
import { useEffect, useContext, useState } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

const tweets = [
  {
    displayName: 'Sanjay',
    userName: '0x11f4E321a3b425cAD399b0a184a5A72F315b6422',
    avatar: 'https://pbs.twimg.com/profile_images/1536603307073974272/4Pcr9Nfn_400x400.jpg',
    text: 'gm',
    isProfileImageNft: true,
    timestamp: '2020-06-01T12:00:00.000Z', // this is how Sanity strores timestamp
  },
  {
    displayName: 'Sanjay',
    userName: '0x11f4E321a3b425cAD399b0a184a5A72F315b6422',
    avatar: 'https://pbs.twimg.com/profile_images/1536603307073974272/4Pcr9Nfn_400x400.jpg',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2020-06-01T12:00:00.000Z', // this is how Sanity strores timestamp
  },
  {
    displayName: 'Sanjay',
    userName: '0x11f4E321a3b425cAD399b0a184a5A72F315b6422',
    avatar: 'https://pbs.twimg.com/profile_images/1536603307073974272/4Pcr9Nfn_400x400.jpg',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2020-06-01T12:00:00.000Z', // this is how Sanity strores timestamp
  },
  {
    displayName: 'Sanjay',
    userName: '0x11f4E321a3b425cAD399b0a184a5A72F315b6422',
    avatar: 'https://pbs.twimg.com/profile_images/1536603307073974272/4Pcr9Nfn_400x400.jpg',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2020-06-01T12:00:00.000Z', // this is how Sanity strores timestamp
  },
]

const ProfileTweets = () => {
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
    <div className={style.wrapper}>
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

export default ProfileTweets