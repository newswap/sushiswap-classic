import { useContext } from 'react'
import { Context as CustomFarmsContext, CustomFarm } from '../contexts/CustomFarms'

const useCustomFarm = (id: string): CustomFarm => {
  const { customFarms } = useContext(CustomFarmsContext)
  const customFarm = customFarms.find((customFarm) => customFarm.id === id)
  return customFarm
}

export default useCustomFarm