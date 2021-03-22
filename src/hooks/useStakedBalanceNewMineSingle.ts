import { useCallback, useEffect, useState } from 'react'
import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getStakedNewMineSingle } from '../sushi/utils'
import useBlock from './useBlock'

const useStakedBalanceNewMineSingle = (newMineContract: Contract) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStakedNewMineSingle(newMineContract, account)
    setBalance(new BigNumber(balance))
  }, [account, newMineContract])

  useEffect(() => {
    if (account && newMineContract) {
      fetchBalance()
    }
  }, [account, setBalance, block, newMineContract])

  return balance
}

export default useStakedBalanceNewMineSingle
