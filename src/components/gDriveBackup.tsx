import Script from "next/script"
import { useGDrive } from "./prtProvider"
import { useState } from "react"

export const GDRIVE_FILENAME = "marcos-next14_poc"

/**
 *  Sign out the user upon button click.
 */
// function handleSignoutClick() {
//   const token = gapi.client.getToken();
//   if (token !== null) {
//     google.accounts.oauth2.revoke(token.access_token);
//     gapi.client.setToken('');
//   }
// }

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
      spaces: 'appDataFolder',
      'pageSize': 10,
      'fields': 'files(id, name)',
    }).then((response) => {
      console.log('response', {response})
      // TODO: check if data exist in GDrive
      if (reponse.status === 200) {
        const { files } = reponse.result
        const gDriveFile = files.find((file) => file.name === GDRIVE_FILENAME)
        if ( gDriveFile != null ) {
          // TODO: compare which one is newer (both must have backup enabled)
          // TODO: If GDrive data newer ask user what to do
          // TODO: If Gdrive data is older update GDrive
        }
        uploadTodoList2GDrive({text: "sample"})
      }
      // TODO: listen to todoList updates and update GDrive
    });
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
