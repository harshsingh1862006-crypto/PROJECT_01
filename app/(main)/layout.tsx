import React from 'react'
import Header from '../components/layout/Header'
import { apiClient } from '../lib/apiClient'

const MainLayout = async ({children} : {children: React.ReactNode}) => {
  let user = null;
  try {
    user = await apiClient.getCurrentUser();
  } catch (error) {
     console.error("Website not running", error)
  }
  return (
    <>
    <Header user = {user ?? null}/>
    <main className = "flex-1">{children}</main>
    </>
  )
}

export default MainLayout