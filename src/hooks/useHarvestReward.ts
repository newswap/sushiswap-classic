import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWallet } from 'use-wallet'
import { harvestRewardToken } from '../sushi/utils'

const useHarvestReward = (tokenMineContract: Contract) => {
  const { account } = useWallet()

  const handleReward = useCallback(async () => {
    try {
      const txHash = await harvestRewardToken(tokenMineContract, account)
      return txHash
    } catch (e) {
      return false
    }
  }, [account, tokenMineContract])

  return { onReward: handleReward }
}

export default useHarvestReward
