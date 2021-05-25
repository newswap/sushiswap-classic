import { useCallback, useEffect, useState } from 'react'
import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js'
import useSushi from './useSushi'
import {isOwnerWithdrawAfterEnd, getRemainingRewards } from '../sushi/utils'
import useBlock from './useBlock'

const useRemainingRewards = (tokenMineContract: Contract) => {
  const [remaining, setRemaining] = useState(new BigNumber(0))
  const sushi = useSushi()
  const block = useBlock()

  const fetchRemainingRewards = useCallback(async () => {   
    const isOwnerWithdraw = await isOwnerWithdrawAfterEnd(tokenMineContract)
    if(isOwnerWithdraw){
      // console.log("isOwnerWithdraw == true")
      setRemaining(new BigNumber(0))
    } else {
      const remainingRewards = await getRemainingRewards(tokenMineContract)
      // console.log("remainingRewards:" + new BigNumber(remainingRewards).toString())
      setRemaining(new BigNumber(remainingRewards))
    }
  }, [tokenMineContract])

  useEffect(() => {
    if (tokenMineContract && sushi) {
      fetchRemainingRewards()
    }
    
  }, [tokenMineContract, sushi, block])

  return remaining
}

export default useRemainingRewards
