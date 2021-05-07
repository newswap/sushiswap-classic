import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import {contractAddresses} from '../sushi/lib/constants'
import { getAllPairs } from '../sushi/utils'

const CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1012')

const useAllPairs = () => {
  const [pairs, setPairs] = useState([{id:contractAddresses.newNUSDTPair[CHAIN_ID], name: CHAIN_ID===1012 ? 'NUSDT-NEW' : 'NEW-NUSDT'}])
  const {
    ethereum,
  }: { ethereum: provider } = useWallet()

  const fetchAllPairs= useCallback(async () => {
    const allPairs = await getAllPairs()

    const formatPairs = allPairs.map((pair) =>
      Object.assign(pair, {
        name : (pair?.token0?.symbol === 'WNEW' ? 'NEW' : pair?.token0?.symbol) + 
                '-' +
                (pair?.token1?.symbol === 'WNEW' ? 'NEW' : pair?.token1?.symbol)
      }),
    )
    // console.log('----------formatPairs')
    // console.log(formatPairs)
    if(formatPairs.length > 0)
      setPairs(formatPairs)
      
  }, [ethereum])

  useEffect(() => {
    if (ethereum) {
      fetchAllPairs()
    }
  }, [ethereum])

  return pairs
}

export default useAllPairs