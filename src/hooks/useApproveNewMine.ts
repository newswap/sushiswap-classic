import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getNewMineContract } from '../sushi/utils'

const useApproveNewMine = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineContract(sushi)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, newMineContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, newMineContract])

  return { onApprove: handleApprove }
}

export default useApproveNewMine
