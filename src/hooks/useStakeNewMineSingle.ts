import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { stakeNewMineSingle, getNewMineSingleContract } from '../sushi/utils'

const useStakeNewMineSingle = () => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stakeNewMineSingle(
          getNewMineSingleContract(sushi),
          amount,
          account,
        )
        console.log(txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, sushi],
  )

  return { onStake: handleStake }
}

export default useStakeNewMineSingle
