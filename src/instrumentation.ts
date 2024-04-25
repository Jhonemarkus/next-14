import { registerOTel } from '@vercel/otel'
export function register() {
  registerOTel({ serviceName: 'marcos-next14-server' })
}

// export async function register() {
//   if (process.env.NEXT_RUNTIME === 'nodejs') {
//     await import('./instrumentation.node.ts')
//   }
// }