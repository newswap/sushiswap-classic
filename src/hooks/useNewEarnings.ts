import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getNewEarned, getNewMineContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useNewEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineContract(sushi)
  // 这就是定时刷新方法
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getNewEarned(newMineContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, newMineContract, sushi])

  useEffect(() => {
    if (account && newMineContract && sushi) {
      fetchBalance()
    }
  }, [account, block, newMineContract, setBalance, sushi])

  return balance
}

export default useNewEarnings
