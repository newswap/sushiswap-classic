import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { harvestNew, getNewMineContract } from '../sushi/utils'

const useNewReward = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineContract(sushi)

  const handleReward = useCallback(async () => {
    try {
      const txHash = await harvestNew(newMineContract, pid, account)
      console.log("-----------useNewReward:"+txHash)
      return txHash
    } catch (e) {
      return false
    }
  }, [account, pid, sushi])

  return { onReward: handleReward }
}

export default useNewReward
