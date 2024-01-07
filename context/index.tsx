'use client'

import { initialBlogFormData } from "@/utils";
import { Blog, BlogFormData } from "@/utils/types";
import React, { Dispatch, SetStateAction, createContext, useState } from "react"

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  formData: BlogFormData;
  setFormData: Dispatch<SetStateAction<BlogFormData>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchResult: Blog[];
  setSearchResult: Dispatch<SetStateAction<Blog[]>>;
}

const initialState = {
  loading: false,
  setLoading: () => {},
  formData: initialBlogFormData,
  setFormData: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  searchResult: [],
  setSearchResult: () => {},
}

export const GlobalContext = createContext<ContextType>(initialState)

export default function GlobalState({
  children
} : {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialBlogFormData)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<Blog[]>([])

  return (
    <GlobalContext.Provider value={{ loading, setLoading, formData, setFormData, searchQuery, setSearchQuery, searchResult, setSearchResult }}>
      {children}
    </GlobalContext.Provider>
  )
}