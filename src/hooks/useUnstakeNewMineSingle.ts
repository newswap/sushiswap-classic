import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWallet } from 'use-wallet'

import { unstakeNewMineSingle } from '../sushi/utils'

const useUnstakeNewMineSingle = (newMineContract: Contract) => {
  const { account } = useWallet()

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
    [account, newMineContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeNewMineSingle
