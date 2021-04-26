import { useContext } from 'react'
import { Context as CustomFarmsContext } from '../contexts/CustomFarms'

const useCustomFarms = () => {
  const { customFarms } = useContext(CustomFarmsContext)
  return [customFarms]
}

export default useCustomFarms
