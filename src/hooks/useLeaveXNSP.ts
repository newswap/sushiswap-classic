import {useCallback} from 'react'

import useSushi from './useSushi'
import {useWallet} from 'use-wallet'

import {leave, getXNSPStakingContract} from '../sushi/utils'

const useLeaveXNSP = () => {
  const {account} = useWallet()
  const sushi = useSushi()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXNSPStakingContract(sushi),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, sushi],
  )

  return {onLeave: handle}
}

export default useLeaveXNSP
