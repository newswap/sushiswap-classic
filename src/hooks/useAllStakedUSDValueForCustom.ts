import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { getContract } from '../utils/erc20'

import {
  getWethContract,
  getTokenMineContract,
  getStakingTokenUSDValue,
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import useNewPrice from './useNewPrice'
import useAllTokens from './useAllTokens'
import useCustomFarms from './useCustomFarms'

export interface StakedValue {
  stakingTokenUSDValue: BigNumber
  // myStakingTokenUSDValue: BigNumber
}

const useAllStakedUSDValueForCustom = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const [customFarms] = useCustomFarms()
  const newPrice = useNewPrice()
  const allTokens = useAllTokens()
  const wethContact = getWethContract(sushi)
  // const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      customFarms.map(
        ({
          id,
          stakingToken,
          isStakingLPToken,
          stakingTokenDecimals
        }: {
          id: string,
          stakingToken: string,
          isStakingLPToken: boolean,
          stakingTokenDecimals: number
        }) =>
          getStakingTokenUSDValue(
            getTokenMineContract(ethereum, id),
            wethContact,
            getContract(ethereum, stakingToken),
            isStakingLPToken,
            stakingTokenDecimals,
            newPrice,
            account,
            allTokens
          ),
      ),
    )

    setBalance(balances)
  }, [account, customFarms, newPrice, wethContact, allTokens])

  useEffect(() => {
    if (customFarms && sushi && newPrice.toNumber() != 0 && wethContact) {
      fetchAllStakedValue()
    }
  }, [account, customFarms, sushi, newPrice, wethContact, allTokens, setBalance])

  return balances
}

export default useAllStakedUSDValueForCustom
