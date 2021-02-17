import BigNumber from 'bignumber.js/bignumber'
import newcoin from '../../assets/img/new.a6cfc11f.png'
import btccoin from '../../assets/img/btclogo.png'
import usdtcoin from '../../assets/img/usdtlogo.png'
import imxcoin from '../../assets/img/imxlogo.png'

export const newCoin = newcoin
export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const contractAddresses = {
  weth: { // wnew
    1007: '0xf4905b9bc02ce21c98eac1803693a9357d5253bf', //小写
    1012: '0xf4905b9bc02ce21c98eac1803693a9357d5253bf'
  },
  newNUSDTPair: {
    1007: '0x56ae975581a382193ff36579c81281e179486c43',  //小写
    1012: '0x0c0c1cfb948a75595b7d70703bf50190e62a2286'  
  },
  newMineSingle: { //改成nuMineSingle
    1007: '0x8b028f0f001417e3b9c086c5740722839dab12b0',  //小写
    1012: '0x8b028f0f001417e3b9c086c5740722839dab12b0'
  },
  merkleDistributor: {
    1007: '0xf8d9dc9bcd3e6bcbfdbd0f1132043bd0ee730ae5',  //小写  test-0xf8d9dc9bcd3e6bcbfdbd0f1132043bd0ee730ae5        dev-0x8f5f9f59c39f9cb8d353cb25b8a0bd58e710caa5  
    1012: '0x8a19104382fcf2858067a4621555ec9f652579be'  
  }, 
  newMineForNode: { // 社群矿区
    1007: '0x50ea3d34b684edf578c377f68d25d3379d3c734a',  //小写  TODO 修改一个新的
    1012: 'TODO'
  },


  masterChef: {
    1007: 'TODO',  //小写 0x99f935050b5851acfb24ce9114c152a369fd89a7
    1012: 'TODO'
  },
  nst: { 
    1007: 'TODO',  //小写 0x43bb9b430ce64c2ed0c39c59fe48fac239149240
    1012: 'TODO',  
  },
  xNST: { // nstbar
    1007: 'TODO',    //小写 0x43e9f5afafd0e897407ee7cf0121d1b2140a8cdc
    1012: 'TODO'
  },
  nsp: {
    1007: 'TODO',    //小写 0x8f3f9902ac83a254711cf87eef32e7aa2e8cd97f
    1012: 'TODO'
  },
  xNSP: { //nspbar
    1007: 'TODO',    //小写 0x639a8e293195694fef98cc854cdfa828ea895927
    1012: 'TODO'
  },
}

// nstFarms supported Pools
export const supportedPools = [
  // {
  //   pid: 1,
  //   lpAddresses: {
  //     1007: '0x955e90ff4fcd6b79823f6f5185097bdec04cf9c5',
  //   },
  //   tokenAddresses: {
  //     1007: '0x43bb9b430ce64c2ed0c39c59fe48fac239149240', //NST
  //   },
  //   name: 'NST Party!',
  //   symbol: 'NST-NEW LP',
  //   tokenSymbol: 'NST',
  //   icon: '👨🏻‍🍳',
  //   iconL: newcoin,
  //   iconR: newcoin
  // },
  // {
  //   pid: 0,
  //   lpAddresses: {
  //     1007: '0x56aE975581a382193FF36579C81281E179486c43',
  //   },
  //   tokenAddresses: {
  //     1007: '0x20F12218281F9CA566B5c41F17c6c19050125cD3', //NUSDT
  //   },
  //   name: 'NUSDT Party!',
  //   symbol: 'NUSDT-NEW LP',
  //   tokenSymbol: 'NUSDT',
  //   icon: '👨🏻‍🍳',
  //   iconL: usdtcoin,
  //   iconR: newcoin
  // }
]

// community mining supported Polls
export const nodeSupportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1007: '0xbba2d33e853737f5cbe3f8834d31bb406d0d5798',
      1012: 'TODO',
    },
    tokenAddresses: {
      1007: '0xed4e695e436a4fce38bba9fb66d980afd66b0e3e', //IMX
      1012: 'TODO',
    },
    name: 'IMX Party!',
    symbol: 'IMX-NEW LP',
    tokenSymbol: 'IMX',
    icon: '👨🏻‍🍳',
    iconL: imxcoin,
    iconR: newcoin
  },
  { //TODO 修改为MCT
    pid: 1,
    lpAddresses: {
      1007: '0xdda2c1d6237dab9351af93e1f3f81047f897e45b',
      1012: 'TODO',
    },
    tokenAddresses: {
      1007: '0xd1eb8bfd4e6af831fa3c7e726e21e9b56a032727', //NBTC
      1012: 'TODO',
    },
    name: 'NBTC Party!',
    symbol: 'NBTC-NEW LP',
    tokenSymbol: 'NBTC',
    icon: '👨🏻‍🍳',
    iconL: btccoin,
    iconR: newcoin
  }
]
