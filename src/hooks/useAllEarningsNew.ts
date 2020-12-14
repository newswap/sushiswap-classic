import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getNewEarned, getNewMineForNodeContract, getNodeFarms } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getNodeFarms(sushi)
  const newMineContract = getNewMineForNodeContract(sushi)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getNewEarned(newMineContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, newMineContract, sushi])

  useEffect(() => {
    if (account && newMineContract && sushi) {
      fetchAllBalances()
    }
  }, [account, block, newMineContract, setBalance, sushi])

  return balances
}

export default useAllEarnings
