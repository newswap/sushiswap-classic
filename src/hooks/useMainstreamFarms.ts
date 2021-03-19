import { useContext } from 'react'
import { Context as MainstreamFarmsContext } from '../contexts/MainstreamFarms'

const useMainstreamFarms = () => {
  const { mainstreamFarms } = useContext(MainstreamFarmsContext)
  return [mainstreamFarms]
}

export default useMainstreamFarms
