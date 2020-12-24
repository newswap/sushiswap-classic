import {useCallback} from 'react'

import useSushi from './useSushi'
import {useWallet} from 'use-wallet'

import {enter, getXNSTStakingContract} from '../sushi/utils'

const useEnter = () => {
  const {account} = useWallet()
  const sushi = useSushi()

  const handle = useCallback(
    async (amount: string) => {
      try {
        const txHash = await enter(
          getXNSTStakingContract(sushi),
          amount,
          account,
        )
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, sushi],
  )

  return {onEnter: handle}
}

export default useEnter
