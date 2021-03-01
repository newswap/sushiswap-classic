import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { updateNewPerLPAll, getNewMineForNodeContract } from '../sushi/utils'

const useUpdateNewPerLPAll = () => {
  const { account } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineForNodeContract(sushi)

  const handleUpdateNewPerLPAll = useCallback(async () => {
    try {
      const txHash = await updateNewPerLPAll(newMineContract, account)
      // console.log("-----------useUpdateNewPerLPAll:"+txHash)
      return txHash
    } catch (e) {
      return false
    }
  }, [account, sushi])

  return { onUpdatePrice: handleUpdateNewPerLPAll }
}

export default useUpdateNewPerLPAll
