import { LocalStorageKeys } from "@/types/localStorageKeys"
import { useEffect, useMemo, useState } from "react"

export enum BackupType {
  NONE='none',
  GDRIVE='gdrive'
}

export type UserPreferences = {
  backup: BackupType
}

export type IUseUserPreferences = {
  isLoading: boolean
  userPreferences: UserPreferences
}

export const usePrivateUserPreferences = (): IUseUserPreferences => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // const localUserPreferences: UserPreferences = useMemo(() => {
  //   const strPrefs = window?.localStorage.getItem(LocalStorageKeys.USER_PREFERENCES)
  //   if (strPrefs) {
  //     try {
  //       return JSON.parse(strPrefs) as UserPreferences
  //     } catch (e) {
  //       console.error('Invalid value for UserPreferences', e)
  //       window?.localStorage.removeItem(LocalStorageKeys.USER_PREFERENCES)
  //     }
  //   }
  //   return {} as UserPreferences
  // }, [])
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(Object.assign(
    {
      backup: BackupType.GDRIVE
    }//,
    // localUserPreferences
  ))
  useEffect(() => {
    setIsLoading(false)
  },[])
  return {
    isLoading,
    userPreferences
  }
}