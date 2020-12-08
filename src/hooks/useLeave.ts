import {useCallback} from 'react'

import useSushi from './useSushi'
import {useWallet} from 'use-wallet'

import {leave, getXNSTStakingContract} from '../sushi/utils'

const useLeave = () => {
  const {account} = useWallet()
  const sushi = useSushi()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXNSTStakingContract(sushi),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, sushi],
  )

  return {onLeave: handle}
}

export default useLeave
