import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [peerDepsExternal(), typescript()],
  external: ['react', '@walletconnect/web3-provider', 'ethers', 'web3modal'],
}
