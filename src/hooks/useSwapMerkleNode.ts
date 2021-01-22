import { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import AccountButton from '../components/TopBar/components/AccountButton'

const MERKLE_URL = process.env.REACT_APP_MERKLE_URL

const useSwapMerkleNode = () => {
  const [node, setNode] = useState({index: 0, amount: "0", account: "", proof: []})

  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()

  const fetchNode = useCallback(async () => {
    let response
    try {
      // console.log("MERKLE_URL:"+MERKLE_URL)
      response = await fetch(MERKLE_URL)
    } catch (error) {
      console.debug('Failed to fetch MERKLE', MERKLE_URL, error)
    }

    if (response && response.ok) {
      const json = await response.json()
      // console.log(account)
      // console.log("merkle.json:")
      // console.log(json)

      const claims = json['claims']
      const claim = claims[account]
      // console.log("claim:")
      // console.log(claim)
      if(claim) {
        setNode({
          index: claim.index, 
          amount: claim.amount,
          account: account,
          proof: claim.proof
        })
      } else {
        setNode({index: 0, amount: "0", account: account, proof: []})        
      }
    }
  }, [account, ethereum])

  useEffect(() => {
    if (account && ethereum) {
      fetchNode()
    }
  }, [account, ethereum, setNode])

  return node
}

export default useSwapMerkleNode
