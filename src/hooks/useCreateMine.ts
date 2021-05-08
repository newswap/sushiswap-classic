import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWallet } from 'use-wallet'
import { createMine } from '../sushi/utils'

const useCreateMine = (tokenMineFactoryContract: Contract) => {
  const { account } = useWallet()

  const handleCreateMine = useCallback(
    async (name: string, stakingToken: string, rewardsToken: string, startTime: string,
            endTime: string, rewardAmount: string, isStakingLPToken: boolean, fee: string) => {
      try {
        const txHash = await createMine(
          tokenMineFactoryContract,
          name, 
          stakingToken, 
          rewardsToken, 
          startTime, 
          endTime, 
          rewardAmount, 
          isStakingLPToken, 
          fee,
          account
        )
        // console.log("useCreateMine txHash==========>"+txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, tokenMineFactoryContract],
  )

  return { onCreateMine: handleCreateMine }
}

export default useCreateMine
