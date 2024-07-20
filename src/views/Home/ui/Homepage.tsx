'use client'
import { CustomInput } from '@/src/shared/ui/CustomInput'
import { SearchProvider } from '@/src/shared/ui/CustomInput/model/slices'
import React from 'react'

export const Homepage = () => {
    return (
            <SearchProvider>
                <CustomInput />
            </SearchProvider>
    )
}
