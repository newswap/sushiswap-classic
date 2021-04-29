import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { getTokenEarned } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useTokenEarnings = (tokenMineContract: Contract) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  // 定时刷新
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getTokenEarned(tokenMineContract, account)
    setBalance(new BigNumber(balance))
  }, [account, tokenMineContract, sushi])

  useEffect(() => {
    if (account && tokenMineContract && sushi) {
      fetchBalance()
    }
  }, [account, block, tokenMineContract, setBalance, sushi])

  return balance
}

export default useTokenEarnings
