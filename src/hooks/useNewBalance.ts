import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import useBlock from './useBlock'

const useNewBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: any } = useWallet()
  const request = {jsonrpc: '2.0', id: 2, method: "eth_getBalance", params: [account, "latest"]}
  // 定时刷新
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    // try {
    //   // new Promise((resolve, reject) => {
    //   //   ethereum.sendAsync(
    //   //     request,
    //   //     (err: Error, result: any) => {
    //   //       if (err) {
    //   //         reject(err)
    //   //       } else {
    //   //         resolve(result)
    //   //       }
    //   //     }
    //   //   )
    //   // }).then((response: any) => {})
    // } catch (error) {
    //   console.log('Failed', error)
    // }

    ethereum.sendAsync(request, (error: any, response: any) => {
      // console.log(error)
      // console.log(response)
      if (error) {
        return 0;
      } else {
        setBalance(new BigNumber(response.result))
        return response.result
      }
    })

  }, [account, ethereum])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, block, setBalance])

  return balance
}

export default useNewBalance

