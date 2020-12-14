/**
 * @author weixuefeng@lubangame.com
 * @version $
 * @time: 2020/11/16--10:51 下午
 * @description
 * @copyright (c) 2020 Newton Foundation. All rights reserved.
 */
import base58 from 'base58check'

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const toHexString = bytes =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

const base58check = {
  encode: function (data) { // hex str without leading 0x, e.g. 03fe...
    return base58.encode(data);
  },
  decode: function (data) { // encoded str, returning hex str has no 0x
    return toHexString(base58.decode(data).payload);
  }
};
const PREFIX = 'NEW'
/**
 * convert hex address to new address.
 * @param {string|undefined} hexAddress
 * @param {number} chainId
 */
export function hexAddress2NewAddress (hexAddress, chainId) {
  if (hexAddress === undefined) {
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
