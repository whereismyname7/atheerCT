import type { ApiResponse } from '@/interfaces/ApiResponse'
import { HttpMethod } from '@/enum/HttpMethod'

interface ApiFetchParams<Req = any> extends Omit<RequestInit, 'method' | 'body'> {
  url: string
  method: HttpMethod
  body?: Req
}

async function apiFetch<Res = any, Req = any>({
  url,
  method,
  body,
  ...fetchOptions
}: ApiFetchParams<Req>): Promise<ApiResponse<Res>> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...fetchOptions,
  })

  const data: ApiResponse<Res> = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'API error')
  }

  return data
}

export default apiFetch
