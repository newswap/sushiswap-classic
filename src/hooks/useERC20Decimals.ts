import { useCallback, useEffect, useState } from 'react'
import { Contract } from 'web3-eth-contract'
import { getDecimals } from '../utils/erc20'

const useERC20Decimals = (tokenContract: Contract) => {
  const [decimals, setDecimals] = useState(0)

  const fetchDecimals = useCallback(async () => {
    const decimals = await getDecimals(tokenContract)
    setDecimals(parseInt(decimals))
  }, [tokenContract])

  useEffect(() => {
    if (tokenContract) {
      fetchDecimals()
    }
  }, [fetchDecimals, tokenContract])

  return decimals
}

export default useERC20Decimals
