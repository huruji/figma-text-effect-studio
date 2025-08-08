import type { AxiosRequestConfig } from "axios"
import axios from "axios"
import { userInfoService } from './user-info-service'

declare global {
  interface Window {
    GlobalBaseUrl?: string;
  }
}

// const BASE_URL = "https://adobe.imagination-soft.com/api"
// todo 注释掉上线前
window.GlobalBaseUrl = "http://localhost:4000/api"

// 获取基础URL的辅助函数
const getBaseUrl = () => window.GlobalBaseUrl || "https://adobe.imagination-soft.com/api"

// 获取默认请求配置的辅助函数
const getDefaultConfig = (): AxiosRequestConfig => {
  const userInfo = userInfoService.getCurrentUserInfo()
  const headers: Record<string, string> = {}

  if (userInfo?.id) {
    headers['X-Figma-ID'] = userInfo.id
  }

  return { headers }
}

// 导出所有服务
export { userInfoService } from './user-info-service'

export async function getUserInfo({
  axiosConfig,
  userId
}: {
  axiosConfig?: AxiosRequestConfig
  userId: string
}) {
  const url = `${window.GlobalBaseUrl || BASE_URL}/figma-text-effect-studio/user-info`
  const res = await axios.post(url, {
    userId
  }, {
    ...axiosConfig || {}
  })
  // console.log('res: ', res)
  const data = res.data
  return data.data
}

export async function generate({
  id,
  axiosConfig,
  userId,
  quality,
}: {
  id: string
  axiosConfig?: AxiosRequestConfig
  userId: string
  quality?: string
}) {
  const reqUrl = `${getBaseUrl()}/figma-text-effect-studio/generate`
  const res = await axios.post(reqUrl, {
    id,
    userId,
    quality,
  }, {
    ...getDefaultConfig(),
    ...axiosConfig || {}
  })
  const data = res.data;
  if (data.status === "success") {
    return data.data
  } else {
    throw new Error(data.message);
  }
}

export async function uploadFile({
  formData
}: {
  formData: FormData
},): Promise<any> {
  const url = `${getBaseUrl()}/upload`
  // const url = `http://localhost:3000/api/upload`

  const res = await axios.post(url, formData, {
    ...getDefaultConfig(),
    headers: {
      ...getDefaultConfig().headers,
      'Content-Type': 'multipart/form-data'
    }
  })
  const data = res.data
  if (data.status === "success") {
    return data.data.url
  } else {
    throw new Error(data.message)
  }
}

export async function handleCollection(action: 'add' | 'delete', id: string) {
  const url = `${getBaseUrl()}/mockup/favorite`
  // const url = `http://localhost:3000/api/upload`

  const res = await axios.post(url, {
    action,
    id
  }, {
    ...getDefaultConfig()
  })
  const data = res.data
  if (data.status === "success") {
    return {
      success: true
    }
  } else {
    console.error('handleCollection error', data.message)
  }
}


export async function getInitData() {
  try {
    const url = `${getBaseUrl()}/figma-text-effect-studio/init-data`
    const res = await axios.post(url, {
    }, {
      ...getDefaultConfig()
    })
    if (res.status === 200) {
      const data = res?.data?.data || {}
      return data
    } else {
      throw new Error('error')
    }
  } catch (error) {
    console.error('error: ', error)
    return {}
  }
}

export async function getConfig({
  url
}: {
  url: string
}): Promise<any> {
  try {
    const res = await axios.get(url, getDefaultConfig());
    if((res.status >= 200 && res.status < 300) || res.status === 304) {
      return res.data
    } else {
      return {}
    }
  } catch(err) {
    return {}
  }
}

export async function getConfigDataById({
  id,
  axiosConfig
}: {
  id: string
  axiosConfig?: AxiosRequestConfig
}) {
  try {
    const url = `${getBaseUrl()}/figma-text-effect-studio/id`
    const res = await axios.post(url, {
      id,
    }, {
      ...getDefaultConfig(),
      ...axiosConfig || {}
    })
    // console.log('res: ', res)
    const data = res.data
    return data.data
  } catch (error) {
    console.error('error: ', error)
    return {}
  }
}

export async function getCurrentConfig({
  r2Url,
  id,
  useUrl
}: {
  r2Url: string
  id: string,
  useUrl: boolean
}) {
  let config = {};
  if (useUrl) {
    try {
      config = await getConfig({ url: r2Url });
    } catch { /* ignore */ }
    if (!config || Object.keys(config).length === 0) {
      try {
        config = await getConfigDataById({ id });
      } catch { /* ignore */ }
    }
    if (config && Object.keys(config).length > 0) {
      return config;
    }
  } else {
    try {
      config = await getConfigDataById({ id });
    } catch { /* ignore */ }
    if (!config || Object.keys(config).length === 0) {
      try {
        config = await getConfig({ url: r2Url });
      } catch { /* ignore */ }
    }
    if (config && Object.keys(config).length > 0) {
      return config;
    }
  }
  return {};
}

export async function getEffectData({
  baseUrl,
  axiosConfig,
  pageSize,
  page,
  slug,
  searchValue,
}: {
  baseUrl?: string
  axiosConfig?: AxiosRequestConfig
  page: number
  pageSize: number
  slug?: string
  searchValue?: string
}) {
  const url = `${getBaseUrl()}/figma-text-effect-studio/effect-data`
  const res = await axios.post(url, {
    page, pageSize, slug, searchValue,
  }, {
    ...getDefaultConfig(),
    ...axiosConfig || {}
  })
  // console.log('res: ', res)
  const data = res.data
  if (data.status === "success") {
    return data.data
  } else {
    return []
  }
}