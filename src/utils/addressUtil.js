/**
 * @author weixuefeng@lubangame.com
 * @version $
 * @time: 2020/11/16--10:51 下午
 * @description
 * @copyright (c) 2020 Newton Foundation. All rights reserved.
 */
import base58check from 'base58check'
import { ethers } from 'ethers'

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const toHexString = bytes =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

const PREFIX = 'NEW'
/**
 * convert hex address to new address.
 * @param {string|undefined} hexAddress
 * @param {number} chainId
 */
export function hexAddress2NewAddress (hexAddress, chainId) {
  if (hexAddress === undefined || hexAddress === null || chainId === undefined) {
    return ''
  }
  hexAddress = hexAddress.trim()
  if (typeof (hexAddress) === 'string' && hexAddress.startsWith(PREFIX)) {
    return hexAddress
  }
  if (hexAddress.startsWith('0x')) {
    hexAddress = hexAddress.slice(2)
  }
  if (hexAddress.length !== 40) {
    return null
  }
  chainId = Number(chainId)
  let data = chainId.toString(16).slice(-8) + hexAddress
  if (data.length % 2 !== 0) {
    data = '0' + data
  }
  return PREFIX + base58check.encode(data)
}

/**
 * convert new address to hex address.
 * @param {string|undefined} newAddress
 * @return {string} hexAddress
 */
 export function newAddress2HexAddress(newAddress) {
  if (newAddress === undefined || newAddress === null) {
    return ''
  }
  newAddress = newAddress.trim()
  if (newAddress.startsWith(PREFIX) && newAddress.length === 39) {
    return '0x' + base58check.decode(newAddress.slice(3), 'hex').data.slice(4)
  } else {
    return ''
  }
}

export const getHexAddress = value => {
  try {
    if(value.startsWith(PREFIX))
      return ethers.utils.getAddress(newAddress2HexAddress(value).toLowerCase())    
    else
      return ethers.utils.getAddress(value.toLowerCase())
  } catch {
    return ''
  }
}

const LOGO_BASE_URL = process.env.REACT_APP_LOGO_BASE_URL
export const getLogoURLByAddress= (address) => {
  return LOGO_BASE_URL + `/${ getHexAddress(address) }/logo.png`  
}
