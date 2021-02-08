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

  const fetchStatistics = useCallback(async () => {
    let response
    try {
      // console.log("TRADE_INFO_URL:"+ TRADE_INFO_URL + "/?address=" + account)
      response = await fetch(TRADE_INFO_URL + "/?address=" + account, { headers: {'Content-Type': 'application/json'} })  
    } catch (error) {
      console.debug('Failed to fetch TRADE_INFO', TRADE_INFO_URL+ "/?address=" + account, error)
    }

    if (response && response.ok) {
      const json = await response.json()
      // console.log("------------------>")
      // console.log(json)

      const error_code = json['error_code']
      // console.log("error_code:"+error_code)
      const result = json['result']
      // console.log("result"+result)

      // // console.log(claim)
      if(error_code == 1) {
        setStatistics({
          total: result.today_total_transactions_number, 
          number: result.transaction_number
        })
      } else {
        setStatistics({total: 0, number: 0})        
      }
    }
  }, [account, ethereum])

  useEffect(() => {
    if (account && ethereum) {
      fetchStatistics()
    }
  }, [account, ethereum, block, setStatistics])

  return statistics
}

export default useSwapStatistics
