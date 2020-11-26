import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { unstakeNewMine, getNewMineContract } from '../sushi/utils'

const useUnstakeNewMine = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstakeNewMine(newMineContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, sushi],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeNewMine
