import { useCallback, useEffect, useState } from 'react'
import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js'
import useSushi from './useSushi'
import { getRewardAmount, getRewardsTokenSupply, getRemainingRewards } from '../sushi/utils'

const useRemainingRewards = (tokenMineContract: Contract) => {
  const [remaining, setRemaining] = useState(new BigNumber(0))
  const sushi = useSushi()

  const fetchRemainingRewards = useCallback(async () => {   
    // TODO 删除
    // const rewardAmount = await getRewardAmount(tokenMineContract)
    // const rewardsTokenSupply = await getRewardsTokenSupply(tokenMineContract)
    // console.log("------------useRemainingRewards")
    // console.log("rewardAmount:"+rewardAmount)
    // console.log("rewardsTokenSupply:"+rewardsTokenSupply)
    // console.log("rewardAmount-rewardsTokenSupply:" + new BigNumber(rewardAmount).minus(rewardsTokenSupply).toString())

    const remainingRewards = await getRemainingRewards(tokenMineContract)
    // console.log("remainingRewards:" + new BigNumber(remainingRewards).toString())
    setRemaining(new BigNumber(remainingRewards))
  }, [tokenMineContract])

  useEffect(() => {
    if (tokenMineContract && sushi) {
      fetchRemainingRewards()
    }
    
  }, [tokenMineContract, sushi])

  return remaining
}

export default useRemainingRewards
