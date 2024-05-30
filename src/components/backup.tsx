'use client'

import { useUserPreferences } from "./prtProvider";
import { BackupType } from "@/hooks/usePrivateUserPreferences";
import GDriveBackup from "./gDriveBackup";

const Backup = () => {
  const { isLoading: loadingUserPreferences, userPreferences } = useUserPreferences()

  // TODO: Check if user already have backup set
  if (loadingUserPreferences) {
    return <div>Loading...</div>
  }
  // TODO: Ask if user wants to enable backups
  if (userPreferences.backup === BackupType.NONE) {
    return <div>☁️ Backup disabled</div>
  }
  if (userPreferences.backup === BackupType.GDRIVE) {
    return <GDriveBackup />
  }
  return (
    <div>
      Backup
      <pre>
        {JSON.stringify(userPreferences, null, 2)}
      </pre>
    </div>
  )
}

export default Backup
