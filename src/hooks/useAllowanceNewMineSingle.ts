import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getNewMineSingleContract } from '../sushi/utils'

const useAllowanceNewMineSingle = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const newMineContract = getNewMineSingleContract(sushi)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      newMineContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, newMineContract, lpContract])

  useEffect(() => {
    if (account && newMineContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, newMineContract, lpContract])

  return allowance
}

export default useAllowanceNewMineSingle
