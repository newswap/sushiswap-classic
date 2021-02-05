import { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import useBlock from './useBlock'

const TRADE_INFO_URL = process.env.REACT_APP_TRADE_INFO_URL

const useSwapStatistics = () => {
  const [statistics, setStatistics] = useState({total: 0, number: 0})
  const block = useBlock()

  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()

  const fetchNode = useCallback(async () => {
    let response
    try {
      console.log("TRADE_INFO_URL:"+ TRADE_INFO_URL + "/" + account)
      response = await fetch(TRADE_INFO_URL + "/" + account)
    } catch (error) {
      console.debug('Failed to fetch TRADE_INFO', TRADE_INFO_URL+ "/" + account, error)
    }

    if (response && response.ok) {
      const json = await response.json()
      // console.log(account)
      // console.log("merkle.json:")
      console.log(json)

      // "error_code": 1
      // "result": {
      //     "today_total_transactions_number": 100, // 今天总交易笔数
      //     "transaction_number": 10,  // 用户今天交易笔数
      // }
  
      const claims = json['claims']
      const claim = claims[account]
      // // console.log("claim:")
      // // console.log(claim)
      // if(claim) {
      //   setStatistics({
      //     index: claim.index, 
      //     amount: claim.amount,
      //     account: account,
      //     proof: claim.proof
      //   })
      // } else {
      //   setStatistics({index: 0, amount: "0", account: account, proof: []})        
      // }
    }
  }, [account, ethereum])

  useEffect(() => {
    if (account && ethereum) {
      fetchNode()
    }
  }, [account, ethereum, block, setStatistics])

  return statistics
}

export default useSwapStatistics
