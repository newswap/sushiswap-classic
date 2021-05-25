import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'
import { ownerWithdrawAfterEnd } from '../sushi/utils'
import { useWallet } from 'use-wallet'

const useOwnerWithdrawAfterEnd = (tokenMineContract: Contract) => {
  const { account } = useWallet()

  const handleOwnerWithdraw = useCallback(async () => {
    try {
      const txHash = await ownerWithdrawAfterEnd(tokenMineContract, account)
      return txHash
    } catch (e) {
      return false
    }
  }, [tokenMineContract, account])

  return { onOwnerWithdraw: handleOwnerWithdraw }
}

export default useOwnerWithdrawAfterEnd
