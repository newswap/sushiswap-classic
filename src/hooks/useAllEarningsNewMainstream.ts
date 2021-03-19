import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getNewEarnedSingle, getMainstreamFarms } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useAllEarningsNewMainstream = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getMainstreamFarms(sushi)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ miningContract }: { miningContract: Contract }) =>
        getNewEarnedSingle(miningContract, account),
      ),
    )
    setBalance(balances)
  }, [account, farms, sushi])

  useEffect(() => {
    if (account && farms && sushi) {
      fetchAllBalances()
    }
  }, [account, block, farms, setBalance, sushi])

  return balances
}

export default useAllEarningsNewMainstream
