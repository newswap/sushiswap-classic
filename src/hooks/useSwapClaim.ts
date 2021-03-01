import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { claim, getMerkleDistributorContract } from '../sushi/utils'

const useSwapClaim = () => {
  const { account } = useWallet()
  const sushi = useSushi()
  const merkleDistributorContract = getMerkleDistributorContract(sushi)

  const handleClaim = useCallback(
    async (index, account, amount, proof) => {
      try {
        const txHash = await claim(merkleDistributorContract, index, account, amount, proof)
        // console.log(txHash)
        return txHash
      } catch (e) {
        return false
      }
  }, [account, sushi])

  return { onClaim: handleClaim }
}

export default useSwapClaim
