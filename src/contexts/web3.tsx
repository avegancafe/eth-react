import React, { createContext, useCallback, useEffect, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

console.log('in lib')
console.log(React)

export const Context = createContext({
  handleConnect: () => {},
  handleDisconnect: () => {},
  connected: false,
  walletAddress: null,
  wallet: null,
})

export const Provider: React.FC = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState(undefined)
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState(undefined)
  const [wallet, setWallet] = useState<any>(undefined)

  const handleConnect = useCallback(async () => {
    const provider = await web3Modal?.connect()
    if (provider) {
      const newWeb3 = new ethers.providers.Web3Provider(provider)
      const accounts = await newWeb3.listAccounts()
      setConnected(true)
      setWalletAddress(accounts[0])
      setWallet(newWeb3.getSigner())
      provider.on('accountsChanged', (newAccounts: string[]) => {
        if (Array.isArray(newAccounts) && newAccounts.length) {
          setWalletAddress(newAccounts[0])
        }
      })
    } else {
      await handleDisconnect()
    }
  }, [setWalletAddress, setWallet, web3Modal, setConnected])

  const handleDisconnect = useCallback(async () => {
    setConnected(false)
    setWalletAddress(undefined)
    setWallet(undefined)
  }, [setConnected, setWalletAddress, setWallet])

  useEffect(() => {
    async function initWeb3Modal() {
      try {
        if (!web3Modal) {
          const providerOptions = {
            walletconnect: {
              package: WalletConnectProvider,
              options: {
                infuraId: process.env.INFURA_ID,
              },
            },
          }
          const web3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions,
            theme: 'dark',
          })

          setWeb3Modal(web3Modal)
        }
      } catch (e) {
        console.log(e)
      }
    }
    initWeb3Modal()
    handleConnect()
  }, [setWeb3Modal, web3Modal])

  return (
    <Context.Provider
      value={{
        handleConnect,
        handleDisconnect,
        connected,
        walletAddress,
        wallet,
      }}
    >
      {children}
    </Context.Provider>
  )
}
