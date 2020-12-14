import { useContext } from 'react'
import { Context as NodeFarmsContext, NodeFarm } from '../contexts/NodeFarms'

const useNodeFarm = (id: string): NodeFarm => {
  const { nodeFarms } = useContext(NodeFarmsContext)
  const nodeFarm = nodeFarms.find((nodeFarm) => nodeFarm.id === id)
  return nodeFarm
}

export default useNodeFarm