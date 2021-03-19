import { useContext } from 'react'
import { Context as MainstreamFarmsContext, MainstreamFarm } from '../contexts/MainstreamFarms'

const useMainstreamFarm = (id: string): MainstreamFarm => {
  const { mainstreamFarms } = useContext(MainstreamFarmsContext)
  const mainstreamFarm = mainstreamFarms.find((mainstreamFarm) => mainstreamFarm.id === id)
  return mainstreamFarm
}

export default useMainstreamFarm