import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import { getAllTokens } from '../sushi/utils'

const useAllTokens = () => {
  const [tokens, setTokens] = useState([])
  const {
    ethereum,
  }: { ethereum: provider } = useWallet()

  const fetchAllTokens= useCallback(async () => {
    const allTokens = await getAllTokens()
    // console.log('----------fetchAllTokens')
    // console.log(allTokens)
    setTokens(allTokens)  
  }, [ethereum])

  useEffect(() => {
    if (ethereum) {
      fetchAllTokens()
    }
  }, [ethereum])

  return tokens
}

export default useAllTokens