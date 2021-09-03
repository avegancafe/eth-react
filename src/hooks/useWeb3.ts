import { useContext } from 'react'
import { Context } from '../contexts/web3'

export const useWeb3 = () => {
  return {
    ...useContext(Context),
  }
}

