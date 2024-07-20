'use client'
import React, { ChangeEvent } from 'react'
import { useSearch } from '../model/slices';

export const CustomInput = () => {
    const { setQuery, query } = useSearch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <>
            <input type='text' value={query} onChange={handleChange} placeholder="Search..."
                className="border border-gray-300 p-2 w-[30%] mx-auto mt-20 rounded-md outline-none text-slate-600"
            />
        </>
    )
}
