import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'

import App from './App.tsx'
import { PermissionlessProvider } from "@permissionless/wagmi"
import { config, capabilities } from "./wagmi.ts"

import './index.css'

globalThis.Buffer = Buffer

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <PermissionlessProvider
              capabilities={capabilities}
          >
        <App />
        </PermissionlessProvider>

      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
