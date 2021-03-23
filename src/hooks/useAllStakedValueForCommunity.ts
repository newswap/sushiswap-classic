import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getNewMineForNodeContract,
  getWethContract,
  getNodeFarms,
  getTotalLPWethValue,
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
}

const useAllStakedValueForCommunity = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getNodeFarms(sushi)
  const newMineContract = getNewMineForNodeContract(sushi)
  const wethContact = getWethContract(sushi)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            newMineContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
            false,
            null
          ),
      ),
    )

    setBalance(balances)
  }, [account, newMineContract, sushi])

  useEffect(() => {
    if (account && newMineContract && sushi) {
      fetchAllStakedValue()
    }
  }, [account, block, newMineContract, setBalance, sushi])

  return balances
}

export default useAllStakedValueForCommunity
