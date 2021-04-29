import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWallet } from 'use-wallet'

import { unstakeGeneral } from '../sushi/utils'

const useUnstakeGeneral = (newMineContract: Contract) => {
  const { account } = useWallet()

  const handleUnstake = useCallback(
    async (amount: string, tokenDecimals: number) => {
      try {
        const txHash = await unstakeGeneral(newMineContract, amount, tokenDecimals, account)
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

export default useUnstakeGeneral
