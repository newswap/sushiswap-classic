import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWallet } from 'use-wallet'
import { stakeNewMineSingle } from '../sushi/utils'

const useStakeNewMineSingle = (newMineContract: Contract) => {
  const { account } = useWallet()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stakeNewMineSingle(
          newMineContract,
          amount,
          account,
        )
        // console.log(txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, newMineContract],
  )

  return { onStake: handleStake }
}

export default useStakeNewMineSingle
