import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { ethers } from 'ethers'
import { client, newSwapClient } from '../apollo/client'
import TokenMineAbi from './lib/abi/tokenmine.json'

import {
  ALL_TOKEN_MINES,
  ALL_PAIRS
} from '../apollo/queries'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getWNewAddress = (sushi) => {
  return sushi && sushi.wethAddress
}
export const getNSTAddress = (sushi) => {
  return sushi && sushi.nstAddress
}
export const getNSPAddress = (sushi) => {
  return sushi && sushi.nspAddress
}
export const getNewNUSDTPairAddress = (sushi) => {
  return sushi && sushi.newNUSDTPairAddress
}
export const getNewMineForNodeAddress = (sushi) => {
  return sushi && sushi.newMineForNodeAddress
}
export const getTokenMineFactoryAddress = (sushi) => {
  return sushi && sushi.tokenMineFactoryAddress
}
export const getNewMineSingleAddress = (sushi) => {
  return sushi && sushi.newMineSingleAddress
}
export const getMerkleDistributorAddress = (sushi) => {
  return sushi && sushi.merkleDistributorAddress
}

export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}
export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getNSTContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.nst
}
export const getXNSTStakingContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.xNSTStaking
}

export const getNSPContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.nsp
}
export const getXNSPStakingContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.xNSPStaking
}

export const getNewMineForNodeContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.newMineForNode
}
export const getTokenMineFactoryContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.tokenMineFactory
}
// TODO DEL
export const getNewMineSingleContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.newMineSingle
}
export const getNewNUSDTPairContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.newNUSDTPair
}

export const getMerkleDistributorContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.merkleDistributor
}

export const getNSTFarms = (sushi) => {
  return sushi
    ? sushi.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          iconL,
          iconR
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'nst',
          earnTokenAddress: sushi.contracts.nst.options.address,
          icon,
          iconL,
          iconR
        }),
      )
    : []
}

export const getNodeFarms = (sushi) => {
  return sushi
    ? sushi.contracts.nodePools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          iconL,
          iconR
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'new',
          icon,
          iconL,
          iconR
        }),
      )
    : []
}

export const getMainstreamFarms = (sushi) => {
  return sushi
    ? sushi.contracts.mainstreamPools.map(
        ({
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
          miningAddress,
          miningContract,
          newPerBlock,
          iconL,
          iconR
        }) => ({
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          miningAddress,
          miningContract,
          newPerBlock,
          earnToken: 'new',
          icon,
          iconL,
          iconR
        }),
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getNSTEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingNST(pid, account).call()
}

export const getNewEarned = async (newMineContract, pid, account) => {
  return newMineContract.methods.pendingNew(pid, account).call()
}

export const getNewEarnedSingle = async (newMineSingleContract, account) => {
  return newMineSingleContract.methods.pendingNew(account).call()
}

export const getNewPrice = async (newNUSDTPairContract, wnewAddress) => {
  const reserves = await newNUSDTPairContract.methods.getReserves().call()
  const token1 = await newNUSDTPairContract.methods.token1().call()

  if(token1.toLowerCase() === wnewAddress)  // token0-usdt,token1-new
    return  (new BigNumber(reserves._reserve0).div(new BigNumber(10).pow(6)))        
              .div(new BigNumber(reserves._reserve1).div(new BigNumber(10).pow(18)))
  else 
    return  (new BigNumber(reserves._reserve1).div(new BigNumber(10).pow(6)))
              .div(new BigNumber(reserves._reserve0).div(new BigNumber(10).pow(18)))
}

export const getClaimedAmount = async (merkleDistributorContract, account) => {
  return merkleDistributorContract.methods.claimedAmount(account).call()
}

// MerkleDistributor claim 
export const claim = async (merkleDistributorContract, index, account, amount, proof) => {  
  return merkleDistributorContract.methods
    .claim(index, account, new BigNumber(amount).toString(),proof)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
  isGetPoolWeight,
  account
) => {
  // console.log('getTotalLPWethValue========')
  // console.log(lpContract.options.address)

  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2)).div(new BigNumber(10).pow(18))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))

  const { amount } = !account ? {amount:0} :
                        (pid > -1 ? await masterChefContract.methods.userInfo(pid, account).call() : await masterChefContract.methods.userInfo(account).call())
                                                
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue,
    myTotalWethValue: balance > 0 ? new BigNumber(amount).div(new BigNumber(balance)).times(totalLpWethValue) : new BigNumber(0),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: isGetPoolWeight ? await getPoolWeight(masterChefContract, pid) : new BigNumber(0),
  }
}

export const approve = async (lpContract, spenderContract, account) => {
  return lpContract.methods
    .approve(spenderContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
      .approve(address, ethers.constants.MaxUint256)
      .send({ from: account })
}

export const getNSTSupply = async (sushi) => {
  return new BigNumber(await sushi.contracts.nst.methods.totalSupply().call())
}

export const getXNSTSupply = async (sushi) => {
  return new BigNumber(await sushi.contracts.xNSTStaking.methods.totalSupply().call())
}

export const getXNSPSupply = async (sushi) => {
  return new BigNumber(await sushi.contracts.xNSPStaking.methods.totalSupply().call())
}

export const getNewSupplyForNode = async (sushi) => {
  return new BigNumber(await sushi.contracts.newMineForNode.methods.newSupply().call())
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const stakeNewMine = async (newMineContract, pid, amount, account) => {
  return newMineContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const stakeNewMineSingle = async (newMineSingleContract, amount, account) => {
  return newMineSingleContract.methods
    .deposit(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const unstakeNewMine = async (newMineContract, pid, amount, account) => {
  return newMineContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const unstakeNewMineSingle = async (newMineSingleContract, amount, account) => {
  return newMineSingleContract.methods
    .withdraw(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

// harvest NST 
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}
// harvest NEW From NewMine
export const harvestNew = async (newMineContract, pid, account) => {
  return newMineContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

// harvest NEW From NewMineSingle
export const harvestNewSingle = async (newMineSingleContract, account) => {
  return newMineSingleContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

// update lp price for community mining
export const updateNewPerLPAll = async (newMineContract, account) => {
  return newMineContract.methods
    .updateNewPerLPAll()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getStakedNewMine = async (newMineContract, pid, account) => {
  try {
    const { amount } = await newMineContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getStakedByAccount = async (miningContract, account) => {
  try {
    const { amount } = await miningContract.methods
      .userInfo(account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        // console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (contract, amount, account) => {
  debugger
  return contract.methods
      .enter(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        // console.log(tx)
        return tx.transactionHash
      })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
      .leave(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        // console.log(tx)
        return tx.transactionHash
      })
}

const TOKENMINES_TO_FETCH = 500
// Loop through every token mines, used for search
export const getAllTokenMines = async () => {
  try {
    let allFound = false
    let tokenMines = []
    let skipCount = 0
    while (!allFound) {
      let result = await client.query({
        query: ALL_TOKEN_MINES,
        variables: {
          skip: skipCount
        },
        // fetchPolicy: 'cache-first'
        fetchPolicy: 'network-only'       
      })
      skipCount = skipCount + TOKENMINES_TO_FETCH
      // console.log("getAllTokenMines----------->")
      // console.log(result)
      tokenMines = tokenMines.concat(result?.data?.tokenMines)
      if (result?.data?.tokenMines.length < TOKENMINES_TO_FETCH || tokenMines.length > TOKENMINES_TO_FETCH) {
        allFound = true
      }
    }
    return tokenMines
  } catch (e) {
    console.log(e)
    return []
  }
}

const PAIRS_TO_FETCH = 500
// Loop through every pair on uniswap, used for search
export const getAllPairs = async () => {
  try {
    let allFound = false
    let pairs = []
    let skipCount = 0
    while (!allFound) {
      let result = await newSwapClient.query({
        query: ALL_PAIRS,
        variables: {
          skip: skipCount
        },
        fetchPolicy: 'cache-first'
      })
      skipCount = skipCount + PAIRS_TO_FETCH
      // console.log("getAllPairs----------->")
      // console.log(result)
      pairs = pairs.concat(result?.data?.pairs)
      if (result?.data?.pairs.length < PAIRS_TO_FETCH || pairs.length > PAIRS_TO_FETCH) {
        allFound = true
      }
    }
    return pairs
  } catch (e) {
    console.log(e)
    return []
  }
}


export const getTokenMineContract = (provider, address) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    TokenMineAbi,
    address,
  )
  return contract
}

export const getTokenEarned = async (tokenMineContract, account) => {
  return tokenMineContract.methods.pendingRewardsToken(account).call()
}

export const getRewardAmount = async (tokenMineContract) => {
  return tokenMineContract.methods.rewardAmount().call()
}

export const getRewardsTokenSupply = async (tokenMineContract) => {
  return tokenMineContract.methods.rewardsTokenSupply().call()
}

export const getRemainingRewards = async (tokenMineContract) => {
  return tokenMineContract.methods.getRemainingRewards().call()
}

export const harvestRewardToken = async (tokenMineContract, account) => {
  return tokenMineContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const createMine = async (tokenMineFactoryContract, name, stakingToken, rewardsToken, 
  startTime, endTime, rewardAmount, isStakingLPToken, fee, account) => {
  
  return tokenMineFactoryContract.methods
    .deploy(
      name,
      stakingToken, 
      rewardsToken, 
      startTime, 
      endTime, 
      rewardAmount, 
      isStakingLPToken
    )
    .send({ from: account, value: fee })
    .on('transactionHash', (tx) => {
      // console.log("createMine==========>")
      // console.log(tx)
      return tx.transactionHash
    })
}

export const stakeGeneral = async (mineContract, amount, tokenDecimals, account) => {
  return mineContract.methods
    .deposit(
      new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimals)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}

export const unstakeGeneral= async (mineContract, amount, tokenDecimals, account) => {
  return mineContract.methods
    .withdraw(
      new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimals)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      // console.log(tx)
      return tx.transactionHash
    })
}
