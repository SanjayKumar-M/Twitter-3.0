const hre = require('hardhat')
const main = async () => {
  const profileImage = await hre.ethers.getContractFactory(
    'Nft',
  )
  const Contract = await profileImage.deploy()

  await Contract.deployed()

  console.log('Profile Image  deployed to:', Contract.address)
}

;(async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()