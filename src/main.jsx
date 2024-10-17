import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const base_testnet = {
  id: 84_532,
  name: 'Base Sepolia',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/27716.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Base Sepolia', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'sepolia-explorer', url: 'https://sepolia-explorer.base.org' },
  },
  contracts: {
    multicall3: {
      address: '0x0e736a5c39B7Cdf798cdd2A3fa7d88Cf4f07804e',
      blockCreated: 16_573_870,
    },
  },
};

const config = getDefaultConfig({
  appName: 'Dojo Message',
  projectId: 'YOUR_PROJECT_ID',
  chains: [base_testnet],
});

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>,
)