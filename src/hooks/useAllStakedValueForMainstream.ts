import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getWethContract,
  getMainstreamFarms,
  getTotalLPWethValue,
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  myTotalWethValue: BigNumber
}

const useAllStakedValueForMainstream = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getMainstreamFarms(sushi)
  const wethContact = getWethContract(sushi)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          miningContract,
          lpContract,
          tokenContract,
        }: {
          miningContract: Contract
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            miningContract,
            wethContact,
            lpContract,
            tokenContract,
            -1,
            false,
            account
          ),
      ),
    )

    setBalance(balances)
  }, [account, farms, sushi])

  useEffect(() => {
    if (account && farms && sushi) {
      fetchAllStakedValue()
    }
  }, [account, block, farms, setBalance, sushi])

  return balances
}

export default useAllStakedValueForMainstream
