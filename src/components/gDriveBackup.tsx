import Script from "next/script"
import { useGDrive } from "./prtProvider"
import { useState } from "react"

export default function GDriveBackup() {
  const [accessTokenReady, setAccessTokenReady] = useState<boolean>(false)
  const { onLoadGAPI, onLoadGis, isLoading, tokenClient } = useGDrive()
  if (!isLoading && ! accessTokenReady) {
    const token = window.gapi.client.getToken()
    console.log('gdrive token', { token })
    // TODO: check if already authorized
    if (token == null) {
      // TODO: authorize user
      tokenClient.callback = (resp) => {
        console.log('token Client callback', { resp })
        setAccessTokenReady(true)
      }
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      tokenClient.requestAccessToken({prompt: ''});
    }
  }
  if (accessTokenReady) {
    // TODO: list files
    gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': 'files(id, name)',
    }).then((response) => {
      console.log('response', {response})
    });
    // TODO: change scope to appdata
    // TODO: check if data exist in GDrive
    // TODO: compare which one is newer (both must have backup enabled)
    // TODO: If GDrive data newer ask user what to do
    // TODO: If Gdrive data is older update GDrive
    // TODO: listen to todoList updates and update GDrive
  }
  return (
    <>
      <Script strategy="lazyOnload" src="https://apis.google.com/js/api.js" onLoad={onLoadGAPI} />
      <Script strategy="lazyOnload" src="https://accounts.google.com/gsi/client" onLoad={onLoadGis} />
      <p>GDriveBackup</p>
      <p>{isLoading ? 'Loading GDrive' : 'ready'}</p>
    </>
  )
}
