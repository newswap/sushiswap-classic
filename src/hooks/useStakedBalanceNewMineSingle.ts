import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStakedNewMineSingle, getNewMineSingleContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useStakedBalanceNewMineSingle = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineSingleContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStakedNewMineSingle(newMineContract, account)
    setBalance(new BigNumber(balance))
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
  }, [account, setBalance, block, sushi])

  return balance
}

export default useStakedBalanceNewMineSingle
