import { useContext } from 'react'
import { Context as NodeFarmsContext } from '../contexts/NodeFarms'

const useNodeFarms = () => {
  const { nodeFarms } = useContext(NodeFarmsContext)
  return [nodeFarms]
}

export default useNodeFarms
