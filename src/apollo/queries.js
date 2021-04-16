import gql from 'graphql-tag'

export const ALL_TOKEN_MINES = gql`
  query tokenMines($skip: Int!) {
    tokenMines(first: 500, skip: $skip, orderBy: createdAtTimestamp, orderDirection: desc) {
      id
      owner
      name
      stakingToken
      rewardsToken
      startBlock
      endBlock
      rewardAmount
      stakingTokenSymbol
      stakingTokenName
      stakingTokenDecimals
      rewardsTokenSymbol
      rewardsTokenName
      rewardsTokenDecimals
      isStakingLPToken
      token0Symbol
      token0Name
      token0Decimals
      token1Symbol
      token1Name
      token1Decimals
      createdAtTimestamp
      createdAtBlockNumber
    }
  }
`