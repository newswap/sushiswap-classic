import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWallet } from 'use-wallet'
import { harvestNewSingle } from '../sushi/utils'

const useNewRewardSingle = (newMineContract: Contract) => {
  const { account } = useWallet()

  const handleReward = useCallback(async () => {
    try {
      const txHash = await harvestNewSingle(newMineContract, account)
      return txHash
    } catch (e) {
      return false
    }
  }, [account, newMineContract])

  return { onReward: handleReward }
}

export default useNewRewardSingle
