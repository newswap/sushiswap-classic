import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getPoolWeight, getMasterChefContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const NST_PER_BLOCK: number = parseInt(process.env.REACT_APP_NST_PER_BLOCK ?? '1')

const useNSTPerBlock = (pid: number) => {
  const [nstPerBlock, setNstPerBlock] = useState(new BigNumber(0))
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)
  // 如果需要定时更新，block加入useEffect
  // const block = useBlock()

  const fetchNSTPerBlock = useCallback(async () => {
    const poolWeight = await getPoolWeight(masterChefContract, pid)
    setNstPerBlock(poolWeight.times(NST_PER_BLOCK))
  }, [masterChefContract, sushi])

  useEffect(() => {
    if (masterChefContract && sushi) {
      fetchNSTPerBlock()
    }
  }, [masterChefContract, setNstPerBlock, sushi])

  return nstPerBlock
}

export default useNSTPerBlock