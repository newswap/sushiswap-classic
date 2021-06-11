import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWallet } from 'use-wallet'
import { stakeNEW } from '../sushi/utils'

const useStakeNEW = (mineContract: Contract) => {
  const { account } = useWallet()

  const handleStake = useCallback(
    async (amount: string, tokenDecimals: number) => {
      try {
        const txHash = await stakeNEW(
          mineContract,
          amount,
          account,
        )
        // console.log(txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, mineContract],
  )

  return { onStakeNEW: handleStake }
}

export default useStakeNEW
