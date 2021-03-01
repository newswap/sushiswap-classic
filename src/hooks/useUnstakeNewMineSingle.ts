import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { unstakeNewMineSingle, getNewMineSingleContract } from '../sushi/utils'

const useUnstakeNewMineSingle = () => {
  const { account } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineSingleContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await unstakeNewMineSingle(newMineContract, amount, account)
        // console.log(txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, sushi],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeNewMineSingle
