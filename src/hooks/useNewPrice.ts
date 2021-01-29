import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getNewPrice, getNewNUSDTPairContract, getWNewAddress } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useNewPrice = () => {
  const [newPrice, setNewPrice] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const newNUSDTPairContract = getNewNUSDTPairContract(sushi)
  const wnewAddress = getWNewAddress(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const price = await getNewPrice(newNUSDTPairContract, wnewAddress)
    setNewPrice(price)
  }, [account, newNUSDTPairContract, sushi])

  useEffect(() => {
    if (account && newNUSDTPairContract && sushi) {
      fetchBalance()
    }
  }, [account, newNUSDTPairContract, setNewPrice, block, sushi])

  return newPrice
}

export default useNewPrice
