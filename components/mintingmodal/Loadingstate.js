import React from 'react'

import { HashLoader } from 'react-spinners'
import { css } from '@emotion/react'

const style = {
    wrapper: `h-[20rem] w-[35rem] text-white bg-[black] rounded-3xl p-10 flex flex-col items-center justify-center`,
    title: `font-semibold text-xl mb-6`,
}

const cssOverride = css`
    display: block;
    margin: 0 auto;
    border-color: black;
  `

function Loadingstate() {
    return (
        <div className={style.wrapper}>
            <div className={style.title}>Minting your cool NFT...</div>
            <HashLoader color={'blue'} loading={true} css={cssOverride} size={45} />
        </div>
    )
}

export default Loadingstate