import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { useWallet } from 'use-wallet'
import { stakeGeneral } from '../sushi/utils'

const useStakeGeneral = (mineContract: Contract) => {
  const { account } = useWallet()

  const handleStake = useCallback(
    async (amount: string, tokenDecimals: number) => {
      try {
        const txHash = await stakeGeneral(
          mineContract,
          amount,
          tokenDecimals,
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

  return { onStake: handleStake }
}

export default useStakeGeneral
