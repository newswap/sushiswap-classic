import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBalance } from '../utils/erc20'
import useBlock from './useBlock'

const useTokenBalanceOf = (tokenAddress: string, userAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    ethereum,
  }: { ethereum: provider } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(ethereum, tokenAddress, userAddress)
    setBalance(new BigNumber(balance))
  }, [userAddress, ethereum, tokenAddress])

  useEffect(() => {
    if (userAddress && ethereum) {
      fetchBalance()
    }
  }, [userAddress, ethereum, setBalance, block, tokenAddress])

  return balance
}

export default useTokenBalanceOf
