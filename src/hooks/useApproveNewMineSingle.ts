import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getNewMineSingleContract } from '../sushi/utils'

const useApproveNewMineSingle = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineSingleContract(sushi)

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

export default useApproveNewMineSingle
