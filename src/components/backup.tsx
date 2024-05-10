'use client'

import { GAPI_CONFIG } from "@/functions/contants";
import usePrivateTodoList from "@/hooks/usePrivateTodoList"
import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { useGDrive, useUserPreferences } from "./prtProvider";
import { BackupType } from "@/hooks/usePrivateUserPreferences";

const Backup = () => {
  const { onLoadGAPI, onLoadGis } = useGDrive()
  const { isLoading: loadingUserPreferences, userPreferences } = useUserPreferences()

  // TODO: Check if user already have backup set
  if (loadingUserPreferences) {
    return <div>Loading...</div>
  }
  // TODO: Ask if user wants to enable backups
  if (userPreferences.backup === BackupType.NONE) {
    return <div>☁️ Backup disabled</div>
  }
  // TODO: check if already authorized
  // TODO: authorize user
  // TODO: list files
  // TODO: change scope to appdata
  // TODO: check if data exist in GDrive
  // TODO: compare which one is newer (both must have backup enabled)
  // TODO: If GDrive data newer ask user what to do
  // TODO: If Gdrive data is older update GDrive
  // TODO: listen to todoList updates and update GDrive
  
  return (
    <div>
      {/* <Script strategy="lazyOnload" src="https://apis.google.com/js/api.js" onLoad={onLoadGAPI} />
      <Script strategy="lazyOnload" src="https://accounts.google.com/gsi/client" onLoad={onLoadGis} /> */}
      Backup
      <pre>
        {JSON.stringify(userPrefernces, null, 2)}
      </pre>
    </div>
  )
}

export default Backup
