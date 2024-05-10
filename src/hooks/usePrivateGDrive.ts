import { useCallback, useState } from "react"

export type IUseGDrive = {
  onLoadGAPI: () => void
  onLoadGis: () => void
}

export const usePrivateGDrive = (): IUseGDrive => {
  const [isLoadingGAPI, setIsLoadingGAPI] = useState<boolean>(true)
  const [isLoadingGis, setIsLoadingGis] = useState<boolean>(true)
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
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GAPI_CONFIG.CLIENT_ID,
      scope: GAPI_CONFIG.SCOPES,
      callback: ''
    })
    setIsLoadingGis(false)
  },[])
  
  // "On-mount" calling load functions for hot-reload
  // useEffect(() => {
  //   onLoadGAPI()
  //   onLoadGis()
  // })
  return {
    onLoadGAPI,
    onLoadGis
  }
}