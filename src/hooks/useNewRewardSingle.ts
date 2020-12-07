import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { harvestNewSingle, getNewMineSingleContract } from '../sushi/utils'

const useNewRewardSingle = () => {
  const { account } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineSingleContract(sushi)

  const handleReward = useCallback(async () => {
    try {
      const txHash = await harvestNewSingle(newMineContract, account)
      return txHash
    } catch (e) {
      return false
    }
  }, [account, sushi])

  return { onReward: handleReward }
}

export default useNewRewardSingle
