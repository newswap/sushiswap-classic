import { useContext } from 'react'
import { Context as NewFarmsContext, NewFarm } from '../contexts/NewFarms'

const useNewFarm = (id: string): NewFarm => {
  const { newFarms } = useContext(NewFarmsContext)
  const newFarm = newFarms.find((newFarm) => newFarm.id === id)
  return newFarm
}

export default useNewFarm