import axios from "axios"
const key = '0fc308f2d239592d1565'
const secret = '0efc9bea3838e9ed55807e62e02c00208801a07273bbec8c5f917f57a895f80b'

export const pinJSONToIPFS = async json => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
    return axios
      .post(url, json, {
        headers: {
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(function (response) {
        return response.data.IpfsHash
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  export const pinFileToIPFS = async (file, pinataMetaData) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
  
    let data = new FormData()
  
    data.append('file', file)
    data.append('pinataMetadata', JSON.stringify(pinataMetaData))
  
    return axios
      .post(url, data, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(function (response) {
        return response.data.IpfsHash
      })
      .catch(function (error) {
        console.log(error)
      })
  }