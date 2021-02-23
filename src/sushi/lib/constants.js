import BigNumber from 'bignumber.js/bignumber'
import newcoin from '../../assets/img/new.a6cfc11f.png'
import btccoin from '../../assets/img/btclogo.png'
import usdtcoin from '../../assets/img/usdtlogo.png'
import imxcoin from '../../assets/img/imxlogo.png'
import mctcoin from '../../assets/img/mctlogo.png'

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
    1007: '0xf313c8852762ae2e856d849e4130ff50f45fe683',  //小写
    1012: '0xd1d4105c4dfa8f76b10fd99645f9cad73afc548b'
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
  { // IMX-NEW
    pid: 0,
    lpAddresses: {
      1007: '0xbba2d33e853737f5cbe3f8834d31bb406d0d5798',
      1012: '0x82742505f549c2bcb3d14490c576c9e2c27ee7b7',
    },
    tokenAddresses: {
      1007: '0xEd4e695e436a4fCE38BBA9FB66D980aFD66b0e3e', //IMX 区分大小写，否则无法获得图片
      1012: '0x223E2E48f2f09c314f4caD3101f63213cB775A93',
    },
    name: 'IMX Party!',
    symbol: 'IMX-NEW LP',
    tokenSymbol: 'IMX',
    icon: '',
    iconL: imxcoin,
    iconR: newcoin
  },
  { // MCT-NEW
    pid: 1,
    lpAddresses: {
      1007: '0xe3715753795fb99c68857a6b7f5c3e6ccae4ec78',
      1012: '0xe3715753795fb99c68857a6b7f5c3e6ccae4ec78',
    },
    tokenAddresses: {
      1007: '0x483246B0Ae0B14DB4C4597C7CC4af2e2ea440a55', //MCT
      1012: '0x483246B0Ae0B14DB4C4597C7CC4af2e2ea440a55',
    },
    name: 'MCT Party!',
    symbol: 'MCT-NEW LP',
    tokenSymbol: 'MCT',
    icon: '',
    iconL: mctcoin,
    iconR: newcoin
  },

  // 以下测试网没有，部署测试网需要注释！！！
  { // MZD-NEW
    pid: 2,
    lpAddresses: {
      1007: '',
      1012: '0x31b62fae9cfc27b0db3bfe07be458f74ea3538ec',
    },
    tokenAddresses: {
      1007: '', 
      1012: '0x40D690551F5F21EccB8cEdc09e86C2dd2E40Dd52',   //MZD
    },
    name: 'MZD Party!',
    symbol: 'MZD-NEW LP',
    tokenSymbol: 'MZD',
    icon: '',
    iconL: '',
    iconR: newcoin
  },

  { // DOL-NEW
    pid: 3,
    lpAddresses: {
      1007: '',
      1012: '0xe4faf4ff4af25cc79ab4bb5a359bb9e06528bb7d',
    },
    tokenAddresses: {
      1007: '', 
      1012: '0x76791bFA7098f8aac59CE9612Ce083584Fd332aF',   //DOL
    },
    name: 'DOL Party!',
    symbol: 'DOL-NEW LP',
    tokenSymbol: 'DOL',
    icon: '',
    iconL: '',
    iconR: newcoin
  },
  { // LOL-NEW
    pid: 4,
    lpAddresses: {
      1007: '',
      1012: '0x30524592b18c4791cdcbab3e7c3030c5aa2d1aab',
    },
    tokenAddresses: {
      1007: '', 
      1012: '0xE67EE3A0581f9FdfE33E51FEC34593630502EE58',   //LOL
    },
    name: 'LOL Party!',
    symbol: 'LOL-NEW LP',
    tokenSymbol: 'LOL',
    icon: '',
    iconL: '',
    iconR: newcoin
  },
  { // JL-NEW
    pid: 5,
    lpAddresses: {
      1007: '',
      1012: '0xde166c2e659e3f5f2c82ac5c6877e5f1134af81b',
    },
    tokenAddresses: {
      1007: '', 
      1012: '0x9cc2AFD608eC856C524320BC37d79C53181cdbb7',   //JL
    },
    name: 'JL Party!',
    symbol: 'JL-NEW LP',
    tokenSymbol: 'JL',
    icon: '',
    iconL: '',
    iconR: newcoin
  },
  { // XIN-NEW
    pid: 6,
    lpAddresses: {
      1007: '',
      1012: '0xade2f4077989219015b493db2dcde25d37217df0',
    },
    tokenAddresses: {
      1007: '', 
      1012: '0x399100123B2A4c1cF7c22C6C3E12798c168A9860',   
    },
    name: 'XIN Party!',
    symbol: 'XIN-NEW LP',
    tokenSymbol: 'XIN',
    icon: '',
    iconL: '',
    iconR: newcoin
  }


]
