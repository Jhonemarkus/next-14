'use client'

import { IUseGDrive, usePrivateGDrive } from "@/hooks/usePrivateGDrive";
import usePrivateTodoList from "@/hooks/usePrivateTodoList";
import { IUseUserPreferences, usePrivateUserPreferences } from "@/hooks/usePrivateUserPreferences";
import { IUseTODOList } from "@/types/hooks/iUseTODOList";
import { createContext, ReactNode, useContext } from "react";

export type iPRTContext = {
  useTODOList: IUseTODOList
  useGDrive: IUseGDrive
  useUserPreferences: IUseUserPreferences
}

export type iPRTProviderProps = {
  children: ReactNode
}

export const PRTContext = createContext<iPRTContext>();

export const PRTProvider = ({children}: iPRTProviderProps): ReactNode => {
  const useTODOList = usePrivateTodoList()
  const useGDrive = usePrivateGDrive()
  const useUserPreferences = usePrivateUserPreferences()
  return (
    <PRTContext.Provider value={{
      useTODOList,
      useGDrive,
      useUserPreferences
    }}>
      {children}
    </PRTContext.Provider>
  );
}

export const useTODOList = () => {
  return useContext(PRTContext).useTODOList
}

export const useGDrive = () => {
  return useContext(PRTContext).useGDrive
}

export const useUserPreferences = () => {
  return useContext(PRTContext).useUserPreferences
}
