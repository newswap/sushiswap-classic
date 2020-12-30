import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { stakeNewMine, getNewMineForNodeContract } from '../sushi/utils'

const useStakeNewMine = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stakeNewMine(
          getNewMineForNodeContract(sushi),
          pid,
          amount,
          account,
        )
        console.log(txHash) 
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, pid, sushi],
  )

  return { onStake: handleStake }
}

export default useStakeNewMine
