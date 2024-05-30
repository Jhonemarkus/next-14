import { GAPI_CONFIG } from "@/functions/contants"
import { useCallback, useState } from "react"

export type IUseGDrive = {
  onLoadGAPI: () => void
  onLoadGis: () => void
}

export const usePrivateGDrive = (): IUseGDrive => {
  const [isLoadingGAPI, setIsLoadingGAPI] = useState<boolean>(true)
  const [isLoadingGis, setIsLoadingGis] = useState<boolean>(true)
  const [tokenClient, setTokenClient] = useState(null)
  // Callbacks for script load
  const onLoadGAPI = useCallback(() => {
    if (!gapi || !isLoadingGAPI) {
      return
    }
    gapi.load('client', async() => {
      await gapi.client.init({
        apiKey: GAPI_CONFIG.API_KEY,
        discoveryDocs: [GAPI_CONFIG.DISCOVERY_DOC]
      })
      setIsLoadingGAPI(false)
    })
  },[])
  const onLoadGis = useCallback(() => {
    if (!google?.accounts || !isLoadingGis) {
      return
    }
    setTokenClient(google.accounts.oauth2.initTokenClient({
      client_id: GAPI_CONFIG.CLIENT_ID,
      scope: GAPI_CONFIG.SCOPES,
      callback: ''
    }))
    setIsLoadingGis(false)
  },[])
  
  // "On-mount" calling load functions for hot-reload
  // useEffect(() => {
  //   onLoadGAPI()
  //   onLoadGis()
  // })
  return {
    onLoadGAPI,
    onLoadGis,
    isLoading: isLoadingGAPI || isLoadingGis,
    tokenClient
  }
}