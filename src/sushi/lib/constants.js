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
    1007: '0x4438e9c8e0c9b209fa8b76c83f73a7d317de3c12', //小写
    1012: '0xf4905b9bc02ce21c98eac1803693a9357d5253bf'
  },
  newNUSDTPair: {
    1007: '0xf8a2db7aecac5968a68677f7b1aef2dd20a03ffb',  //小写
    1012: '0x0c0c1cfb948a75595b7d70703bf50190e62a2286'  
  },
  newMineSingle: { //改成nuMineSingle
    1007: '0xa6f3fb1557a5053af53d4b7febddafc8f03e6cbb',  //小写
    1012: '0x8b028f0f001417e3b9c086c5740722839dab12b0'
  },
  merkleDistributor: {
    1007: '0xf8d9dc9bcd3e6bcbfdbd0f1132043bd0ee730ae5',  //小写  test-0xf8d9dc9bcd3e6bcbfdbd0f1132043bd0ee730ae5        dev-0x8f5f9f59c39f9cb8d353cb25b8a0bd58e710caa5  
    1012: '0x8a19104382fcf2858067a4621555ec9f652579be'  
  }, 
  newMineForNode: { // 社群矿区
    1007: '0xfa292419afc73fc14dc8ea0d7cdc6a65cc616b56',  //小写
    1012: '0xd1d4105c4dfa8f76b10fd99645f9cad73afc548b'
  },
  tokenMineFactory: { // 自定义挖矿工厂
    1007: '0x43c2757b3f339f66577ab81ac923c234cd086512',  //小写
    1012: ''
  },

  masterChef: {
    1007: 'TODO',  //小写
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
  //     1007: '0xf8a2db7aecac5968a68677f7b1aef2dd20a03ffb',
  //   },
  //   tokenAddresses: {
  //     1007: '0xC01A73fBF1c1953D18b48518259b36D70b07F277', //NUSDT
  //   },
  //   name: 'NUSDT Party!',
  //   symbol: 'NUSDT-NEW LP',
  //   tokenSymbol: 'NUSDT',
  //   icon: '👨🏻‍🍳',
  //   iconL: usdtcoin,
  //   iconR: newcoin
  // }
]

export const mainstreamSupportedPools = [
  // { // NUSDT-NEW
  //   miningAddresses: {
  //     1007: '0xa6f3fb1557a5053af53d4b7febddafc8f03e6cbb',  //小写
  //     1012: '0x8b028f0f001417e3b9c086c5740722839dab12b0'
  //   },
  //   lpAddresses: {
  //     1007: '0xf8a2db7aecac5968a68677f7b1aef2dd20a03ffb',
  //     1012: '',
  //   },
  //   tokenAddresses: {
  //     1007: '0xC01A73fBF1c1953D18b48518259b36D70b07F277', // 区分大小写，否则无法获得图片
  //     1012: '', 
  //   },
  //   newPerBlocks: {
  //     1007: '1', 
  //     1012: '49.603174', 
  //   },
  //   name: 'NUSDT Party!',
  //   symbol: 'NUSDT-NEW LP',
  //   tokenSymbol: 'NUSDT',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // NETH-NEW
  //   miningAddresses: {
  //     1007: '0x58718951f6804ce11e7a249d7ebec27125ca90b7',  //小写
  //     1012: ''
  //   },
  //   lpAddresses: {
  //     1007: '0x087b650f59a003b55fa36941365bd31c9a195c66',
  //     1012: '',
  //   },
  //   tokenAddresses: {
  //     1007: '0x56963f254186464b0be5003486d5501FC13e07D4', // 区分大小写，否则无法获得图片
  //     1012: '', 
  //   },
  //   newPerBlocks: {
  //     1007: '2', 
  //     1012: '', 
  //   },
  //   name: 'NETH Party!',
  //   symbol: 'NETH-NEW LP',
  //   tokenSymbol: 'NETH',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
]

// // community mining supported Polls
export const nodeSupportedPools = [
  // // mainnet
  // { // IMX-NEW
  //   pid: 0,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x82742505f549c2bcb3d14490c576c9e2c27ee7b7',
  //   },
  //   tokenAddresses: {
  //     1007: '',
  //     1012: '0x223E2E48f2f09c314f4caD3101f63213cB775A93', //IMX 区分大小写，否则无法获得图片
  //   },
  //   name: 'IMX Party!',
  //   symbol: 'IMX-NEW LP',
  //   tokenSymbol: 'IMX',
  //   icon: '',
  //   iconL: imxcoin,
  //   iconR: newcoin
  // },
  // { // MCT-NEW
  //   pid: 1,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0xe3715753795fb99c68857a6b7f5c3e6ccae4ec78',
  //   },
  //   tokenAddresses: {
  //     1007: '', //MCT
  //     1012: '0x483246B0Ae0B14DB4C4597C7CC4af2e2ea440a55',
  //   },
  //   name: 'MCT Party!',
  //   symbol: 'MCT-NEW LP',
  //   tokenSymbol: 'MCT',
  //   icon: '',
  //   iconL: mctcoin,
  //   iconR: newcoin
  // },
  // { // MZD-NEW
  //   pid: 2,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x31b62fae9cfc27b0db3bfe07be458f74ea3538ec',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x40D690551F5F21EccB8cEdc09e86C2dd2E40Dd52',   //MZD
  //   },
  //   name: 'MZD Party!',
  //   symbol: 'MZD-NEW LP',
  //   tokenSymbol: 'MZD',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // DOL-NEW
  //   pid: 3,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0xe4faf4ff4af25cc79ab4bb5a359bb9e06528bb7d',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x76791bFA7098f8aac59CE9612Ce083584Fd332aF',   //DOL
  //   },
  //   name: 'DOL Party!',
  //   symbol: 'DOL-NEW LP',
  //   tokenSymbol: 'DOL',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // LOL-NEW
  //   pid: 4,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x30524592b18c4791cdcbab3e7c3030c5aa2d1aab',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0xE67EE3A0581f9FdfE33E51FEC34593630502EE58',   //LOL
  //   },
  //   name: 'LOL Party!',
  //   symbol: 'LOL-NEW LP',
  //   tokenSymbol: 'LOL',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // JL-NEW
  //   pid: 5,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0xde166c2e659e3f5f2c82ac5c6877e5f1134af81b',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x9cc2AFD608eC856C524320BC37d79C53181cdbb7',   //JL
  //   },
  //   name: 'JL Party!',
  //   symbol: 'JL-NEW LP',
  //   tokenSymbol: 'JL',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // XIN-NEW
  //   pid: 6,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0xade2f4077989219015b493db2dcde25d37217df0',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x399100123B2A4c1cF7c22C6C3E12798c168A9860',   
  //   },
  //   name: 'XIN Party!',
  //   symbol: 'XIN-NEW LP',
  //   tokenSymbol: 'XIN',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // NAC-NEW
  //   pid: 7,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x505f7d4c6e030d257a89302409cc49ccc607ba12',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x2558c362799314b050e915548b530976B7a8fc14',   
  //   },
  //   name: 'NAC Party!',
  //   symbol: 'NAC-NEW LP',
  //   tokenSymbol: 'NAC',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // AD-NEW
  //   pid: 8,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x3e5946af5e5a65640be8d4b0bfee39e7ea61d5c1',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0xDD03BF2170d1fcb934453F4e1a206AF225fefD54',   
  //   },
  //   name: 'AD Party!',
  //   symbol: 'AD-NEW LP',
  //   tokenSymbol: 'AD',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // DVC-NEW
  //   pid: 9,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x66b42aa2a26e16dea352aeee4d47c8c251a8354e',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x8E1fCE3e20FBa415bE61cE95610521bC7a4df121',   
  //   },
  //   name: 'DVC Party!',
  //   symbol: 'DVC-NEW LP',
  //   tokenSymbol: 'DVC',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // // { // DOGE-NEW  删除
  // //   pid: 10,
  // //   lpAddresses: {
  // //     1007: '',
  // //     1012: '0x71bf2cb40412dfd511adf9a5f24b7fb97a076288',
  // //   },
  // //   tokenAddresses: {
  // //     1007: '', 
  // //     1012: '0x115d702Fc5a31b9DC74F1468Df0D3c65bBFECe77',   
  // //   },
  // //   name: 'DOGE Party!',
  // //   symbol: 'DOGE-NEW LP',
  // //   tokenSymbol: 'DOGE',
  // //   icon: '',
  // //   iconL: '',
  // //   iconR: newcoin
  // // },
  // { // ECARE-NEW
  //   pid: 11,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x7a4aa1c009db9d93118ed273f294a0019a2b66de',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x9fb33bf209E16138C87548ABaeB78C8eb8d038aC',   
  //   },
  //   name: 'ECARE Party!',
  //   symbol: 'ECARE-NEW LP',
  //   tokenSymbol: 'ECARE',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // GYSQ-NEW
  //   pid: 12,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x390523ee97294fdcdce3cfa0aed1d5a4828d7891',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x8B6231d9EcB6Ec6f6AA3a5F889cF14346857e141',   
  //   },
  //   name: 'GYSQ Party!',
  //   symbol: 'GYSQ-NEW LP',
  //   tokenSymbol: 'GYSQ',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // MCC-NEW
  //   pid: 13,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x6fe0ea67d9d536df7c045da4f4f8d954385aaee0',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x888C5723822dae91c00b80e2812B5d59a2601B01',   
  //   },
  //   name: 'MCC Party!',
  //   symbol: 'MCC-NEW LP',
  //   tokenSymbol: 'MCC',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // STC-NEW
  //   pid: 14,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x834d7f93ce46e495f7f5d50021b503f9c3cb1e5b',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x463A9e854D5A08ccbF227D3cefD4fBd09FEE6B1E',   
  //   },
  //   name: 'STC Party!',
  //   symbol: 'STC-NEW LP',
  //   tokenSymbol: 'STC',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // XC-NEW
  //   pid: 15,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x02159fbcb57b0b5357e95eb68bf314b00f242905',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0xCad38A1E4E3918f03b12A451Ce5835C8a274586C',   
  //   },
  //   name: 'XC Party!',
  //   symbol: 'XC-NEW LP',
  //   tokenSymbol: 'XC',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // LBP-NEW
  //   pid: 16,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x946571a62f53318e7f6ba67873369c997b3b118a',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x4DcbC88C1d2C9E36a5DB99B7f9523a5F0C19D507',   
  //   },
  //   name: 'LBP Party!',
  //   symbol: 'LBP-NEW LP',
  //   tokenSymbol: 'LBP',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // DLD-NEW
  //   pid: 17,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x30a5b4ac0df2f6223b45aef82039f1731d291930',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0xE15B9d4979CAcAD3e01f86909005ecc3ACcEA498',   
  //   },
  //   name: 'DLD Party!',
  //   symbol: 'DLD-NEW LP',
  //   tokenSymbol: 'DLD',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // JIN-NEW
  //   pid: 18,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x741b2e6ba99e431355a6dad0eb4d93514924b072',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x5C22B2BcE6EB7f525a7b2931F301B4F48edc5Ad6',   
  //   },
  //   name: 'JIN Party!',
  //   symbol: 'JIN-NEW LP',
  //   tokenSymbol: 'JIN',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // TICT-NEW
  //   pid: 19,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x50f11868ea46044018cba3dfbd015517af623cc7',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0xF201F4FE14FD8a363BC3782E42d808316C0d1762',   
  //   },
  //   name: 'TICT Party!',
  //   symbol: 'TICT-NEW LP',
  //   tokenSymbol: 'TICT',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // BER-NEW
  //   pid: 20,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x7526b68ec2da585673bef04f58b4d1773bcf6fa5',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x76aBb404247b10f80f77d426f70eD23c7aD21D18',   
  //   },
  //   name: 'BER Party!',
  //   symbol: 'BER-NEW LP',
  //   tokenSymbol: 'BER',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // CICI-NEW
  //   pid: 21,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x40dac2f1993eed252f7e0e3d421ec1700f01a045',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x4ddeAA082891b95029eEAf5463a2017E5cbcB9dF',   
  //   },
  //   name: 'CICI Party!',
  //   symbol: 'CICI-NEW LP',
  //   tokenSymbol: 'CICI',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // DKY-NEW
  //   pid: 22,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x36335e3e01fa6cb5bd1767fba44dd666117219ae',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0xc7Fe3d6A7DBada78ba235ed49Cc48F2b7aA07E98',   
  //   },
  //   name: 'DKY Party!',
  //   symbol: 'DKY-NEW LP',
  //   tokenSymbol: 'DKY',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // MTC-NEW
  //   pid: 23,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0xcca573275eab37e320c1fcab79e85c829c29ebba',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0xC68Cd1e7ac55De78859d0d25DC0E9344b0682e71',   
  //   },
  //   name: 'MTC Party!',
  //   symbol: 'MTC-NEW LP',
  //   tokenSymbol: 'MTC',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // CST-NEW
  //   pid: 24,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0xccf438a14b8c9c7affb731e8f4cd4022b81d11c6',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x024fa3CD02d0Cbf674F0D83eC1FBd066570a4629',   
  //   },
  //   name: 'CST Party!',
  //   symbol: 'CST-NEW LP',
  //   tokenSymbol: 'CST',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // BNN-NEW
  //   pid: 25,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x17e847cd20f7147fa230bab82d6672320f096fdf',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x787771644bFCDf0001CeafC35d2b0233B42FBe0F',   
  //   },
  //   name: 'BNN Party!',
  //   symbol: 'BNN-NEW LP',
  //   tokenSymbol: 'BNN',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // MARS-NEW
  //   pid: 26,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x05ba041186b25607ef1ac2d3943d2a5d749f3256',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0xB313BdEcf6fEcC64Cca0CBA49FCC0800a2D376d0',   
  //   },
  //   name: 'MARS Party!',
  //   symbol: 'MARS-NEW LP',
  //   tokenSymbol: 'MARS',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // QWCII-NEW
  //   pid: 27,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x5c7205a2391d1a6edcaa3b5f2af4fc30a1a57882',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x93C615773C642e139cEbF5Df3a13BAd7470D634e',   
  //   },
  //   name: 'QWCII Party!',
  //   symbol: 'QWCII-NEW LP',
  //   tokenSymbol: 'QWCII',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // XYC-NEW
  //   pid: 28,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x9cef566e9a43a6636e8460effc4f584398bb99f6',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x8d18101AA8489fbA202afd25EF3A6C98c391B23a',   
  //   },
  //   name: 'XYC Party!',
  //   symbol: 'XYC-NEW LP',
  //   tokenSymbol: 'XYC',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // FREE-NEW
  //   pid: 29,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0xde9269b27e8e002d0ece639a6c973453604b0133',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x5A51F333725F91cB68Dc682BAB1c7dB99ad8A028',   
  //   },
  //   name: 'FREE Party!',
  //   symbol: 'FREE-NEW LP',
  //   tokenSymbol: 'FREE',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // },
  // { // NSB-NEW
  //   pid: 30,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '0x9c4c758c8eacd97a893842d561cc43b2cfc9668a',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '0x23262131c5EE341470df6A2D037d0Cd78A49A43a',   
  //   },
  //   name: 'NSB Party!',
  //   symbol: 'NSB-NEW LP',
  //   tokenSymbol: 'NSB',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // }

  // { // ?-NEW
  //   pid: ?,
  //   lpAddresses: {
  //     1007: '',
  //     1012: '?',
  //   },
  //   tokenAddresses: {
  //     1007: '', 
  //     1012: '?',   
  //   },
  //   name: '? Party!',
  //   symbol: '?-NEW LP',
  //   tokenSymbol: '?',
  //   icon: '',
  //   iconL: '',
  //   iconR: newcoin
  // }
  // ==================测试网
  { // DLD-NEW
    pid: 0,
    lpAddresses: {
      1007: '0x2d8bb13087d6f6974e735bf440bc1de3f3c537f1',
      1012: '',
    },
    tokenAddresses: {
      1007: '0x85cEC5E820B550e287Bf42e1B159d2dD39116BB9', // 区分大小写，否则无法获得图片
      1012: '', 
    },
    name: 'DLD Party!',
    symbol: 'DLD-NEW LP',
    tokenSymbol: 'DLD',
    icon: '',
    iconL: '',
    iconR: newcoin
  },
  { // GYSQ-NEW
    pid: 1,
    lpAddresses: {
      1007: '0x4f3314ddd1f23cd1d0e9c6f14b13557a142b556d',
      1012: '',
    },
    tokenAddresses: {
      1007: '0x647780D9A71875b09C064d9C053108f04829F327', 
      1012: '',
    },
    name: 'GYSQ Party!',
    symbol: 'GYSQ-NEW LP',
    tokenSymbol: 'GYSQ',
    icon: '',
    iconL: '',
    iconR: newcoin
  },

]
