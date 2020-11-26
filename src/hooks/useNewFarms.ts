import { useContext } from 'react'
import { Context as NewFarmsContext } from '../contexts/NewFarms'

const useNewFarms = () => {
  const { newFarms } = useContext(NewFarmsContext)
  return [newFarms]
}

export default useNewFarms
