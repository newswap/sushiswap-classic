import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getClaimedAmount, getMerkleDistributorContract } from '../sushi/utils'
import useSushi from './useSushi'

const useSwapClaimedAmount = () => {
  const [amount, setAmount] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const merkleDistributorContract = getMerkleDistributorContract(sushi)

  const fetchAmount = useCallback(async () => {
    const amount = await getClaimedAmount(merkleDistributorContract, account)
        
    setAmount(new BigNumber(amount))
  }, [account, merkleDistributorContract, sushi])

  useEffect(() => {
    if (account && merkleDistributorContract && sushi) {
      fetchAmount()
    }
  }, [account, merkleDistributorContract, setAmount, sushi])

  return amount
}

export default useSwapClaimedAmount
