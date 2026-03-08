'use client'
export const checkUserAuthenticated = () => {
    const getStorageItem = (key) => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key)
      }
      return null
    }
  
    const userToken = getStorageItem('MF_USER_TOKEN')

    return !!userToken
  }
   