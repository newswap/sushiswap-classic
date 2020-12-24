import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getTotalSupply } from '../utils/erc20'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import useBlock from './useBlock'

const useTotalSupply = (tokenAddress: string) => {
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0))
  const {
    ethereum,
  }: { ethereum: provider } = useWallet()
  const block = useBlock()

  const fetchTotalSupply = useCallback(async () => {
    const totalSupply = await getTotalSupply(ethereum, tokenAddress)
    setTotalSupply(new BigNumber(totalSupply))
  }, [tokenAddress, ethereum])

  useEffect(() => {
    if (tokenAddress && ethereum) {
      fetchTotalSupply()
    }
  }, [tokenAddress, ethereum, block])

  return totalSupply
}

export default useTotalSupply
