import { trsEndpoint } from '@/envDefault'
import { ServiceInfo, Tool } from '@/types/trs'

export const getServiceInfo = async (): Promise<ServiceInfo> => {
  const res = await fetch(`${trsEndpoint().replace(/\/$/, '')}/service-info`, {
    method: 'GET',
  })
  if (!res.ok) {
    throw new Error(
      `Failed to fetch /service-info with error: ${res.status} ${res.statusText}`
    )
  }
  return await res.json()
}

export const isGhTrs = async (): Promise<void> => {
  const serviceInfo = await getServiceInfo()
  const artifact = serviceInfo?.type?.artifact
  if (!artifact) {
    throw new Error('Failed to get artifact from service-info')
  }
  const version = serviceInfo?.type?.version
  if (!version) {
    throw new Error('Failed to get version from service-info')
  }
  if (!(artifact === 'gh-trs' && version === '2.0.1')) {
    throw new Error(
      `The ddbj/yevis-web only supports artifact: gh-trs and version: 2.0.1 as a TRS API. The response from service-info is artifact: ${artifact} and version: ${version}`
    )
  }
}

export const getTools = async (): Promise<Tool[]> => {
  const res = await fetch(`${trsEndpoint().replace(/\/$/, '')}/tools`, {
    method: 'GET',
  })
  if (!res.ok) {
    throw new Error(
      `Failed to fetch /tools with error: ${res.status} ${res.statusText}`
    )
  }
  return await res.json()
}