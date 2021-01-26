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

// DEL 未使用
// export const addressMap = {
//   uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
//   uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
//   YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
//   YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
//   UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
//   WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
//   UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
//   LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
//   MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
//   SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
//   COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
//   LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
//   SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
// }

export const contractAddresses = {
  masterChef: {
    1007: '0x99f935050b5851acfb24ce9114c152a369fd89a7',  //小写
    1012: 'TODO'
  },
  weth: { // wnew
    1007: '0xf4905b9bc02ce21c98eac1803693a9357d5253bf', //小写
    1012: '0xf4905b9bc02ce21c98eac1803693a9357d5253bf'
  },
  nst: { 
    1007: '0x43bb9b430ce64c2ed0c39c59fe48fac239149240',  //小写
    1012: 'TODO',  
  },
  xNST: { // nstbar
    1007: '0x43e9f5afafd0e897407ee7cf0121d1b2140a8cdc',    //小写
    1012: 'TODO'
  },
  nsp: {
    1007: '0x8f3f9902ac83a254711cf87eef32e7aa2e8cd97f',    //小写
    1012: 'TODO'
  },
  xNSP: { //nspbar
    1007: '0x639a8e293195694fef98cc854cdfa828ea895927',    //小写
    1012: 'TODO'
  },
  newMineForNode: {
    1007: '0x50ea3d34b684edf578c377f68d25d3379d3c734a',  //小写
    1012: 'TODO'
  },
  newMineSingle: { //改成nuMineSingle
    1007: '0x8b028f0f001417e3b9c086c5740722839dab12b0',  //小写
    1012: 'TODO'
  },
  newNUSDTPair: {
    1007: '0x56ae975581a382193ff36579c81281e179486c43',  //小写
    1012: 'TODO'  
  },
  merkleDistributor: {
    1007: '0x8f5f9f59c39f9cb8d353cb25b8a0bd58e710caa5',  //小写
    1012: 'TODO'  
  }, 
}

/*
SLP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

// nstFarms supported Polls
export const supportedPools = [
  {
    pid: 1,
    lpAddresses: {
      1007: '0x955e90ff4fcd6b79823f6f5185097bdec04cf9c5',
    },
    tokenAddresses: {
      1007: '0x43bb9b430ce64c2ed0c39c59fe48fac239149240', //NST
    },
    name: 'NST Party!',
    symbol: 'NST-NEW LP',
    tokenSymbol: 'NST',
    icon: '👨🏻‍🍳',
    iconL: newcoin,
    iconR: newcoin
  },
  {
    pid: 0,
    lpAddresses: {
      1007: '0x56aE975581a382193FF36579C81281E179486c43',
    },
    tokenAddresses: {
      1007: '0x20F12218281F9CA566B5c41F17c6c19050125cD3', //NUSDT
    },
    name: 'NUSDT Party!',
    symbol: 'NUSDT-NEW LP',
    tokenSymbol: 'NUSDT',
    icon: '👨🏻‍🍳',
    iconL: usdtcoin,
    iconR: newcoin
  }
]

// nodeFarms supported Polls
export const nodeSupportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1007: '0xbba2d33e853737f5cbe3f8834d31bb406d0d5798',
    },
    tokenAddresses: {
      1007: '0xed4e695e436a4fce38bba9fb66d980afd66b0e3e', //IMX
    },
    name: 'IMX Party!',
    symbol: 'IMX-NEW LP',
    tokenSymbol: 'IMX',
    icon: '👨🏻‍🍳',
    iconL: imxcoin,
    iconR: newcoin
  },
  {
    pid: 1,
    lpAddresses: {
      1007: '0xdda2c1d6237dab9351af93e1f3f81047f897e45b',
    },
    tokenAddresses: {
      1007: '0xd1eb8bfd4e6af831fa3c7e726e21e9b56a032727', //NBTC
    },
    name: 'NBTC Party!',
    symbol: 'NBTC-NEW LP',
    tokenSymbol: 'NBTC',
    icon: '👨🏻‍🍳',
    iconL: btccoin,
    iconR: newcoin
  }
]
