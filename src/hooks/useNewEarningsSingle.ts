import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getNewEarnedSingle, getNewMineSingleContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useNewEarningsSingle = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineSingleContract(sushi)
  // 定时刷新
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getNewEarnedSingle(newMineContract, account)
    setBalance(new BigNumber(balance))
  }, [account, newMineContract, sushi])

  useEffect(() => {
    if (account && newMineContract && sushi) {
      fetchBalance()
    }
  }, [account, block, newMineContract, setBalance, sushi])

  return balance
}

export default useNewEarningsSingle
