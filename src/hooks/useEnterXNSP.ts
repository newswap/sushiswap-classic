import {useCallback} from 'react'

import useSushi from './useSushi'
import {useWallet} from 'use-wallet'

import {enter, getXNSPStakingContract} from '../sushi/utils'

const useEnterXNSP = () => {
  const {account} = useWallet()
  const sushi = useSushi()

  const handle = useCallback(
    async (amount: string) => {
      try {
        const txHash = await enter(
          getXNSPStakingContract(sushi),
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

export default useEnterXNSP
