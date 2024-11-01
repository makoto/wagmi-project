import { http, createConfig } from 'wagmi'
import { sepolia, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'
const pimlicoApiKey = PIMLICO_API_KEY
console.log({pimlicoApiKey})
export const config = createConfig({
  chains: [sepolia, baseSepolia],
  connectors: [
      // coinbase wallet is one of the smart accounts that supports ERC-7677
      coinbaseWallet({ appName: "Pimlico", preference: "smartWalletOnly" })
  ],
  transports: {
      [sepolia.id]: http(),
      [baseSepolia.id]: http("https://sepolia.base.org")
  },
})

export const capabilities = {
  paymasterService: {
    [baseSepolia.id]: {
        url: `https://api.pimlico.io/v2/${baseSepolia.id}/rpc?apikey=${pimlicoApiKey}`
    }
  }
}
declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
