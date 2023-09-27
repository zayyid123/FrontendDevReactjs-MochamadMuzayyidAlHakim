'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const BreadCrumb = ({ dataLink, isAdmin = false }) => {
  const router = useRouter()

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <div 
            className="cursor-pointer inline-flex items-center text-base font-medium"
            onClick={() => {
              if (isAdmin === 'user') {
                router.push('/dashboard-user')
              } else if (isAdmin) {
                router.push('/dashboard-admin')
              } else {
                router.push('/')
              }
            }}
          >
            <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Home
          </div>
        </li>
        {
          dataLink.map((res, index) => 
            <li key={'breadCrumLink'+index}>
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <div 
                  className={`ml-1 text-base font-medium text-def-300 md:ml-2 ${res.link !== '-' && 'cursor-pointer hover:text-def-500'}`}
                  onClick={() => {
                    if (res.link !== '-') {
                      router.push(res.link)
                    }
                  }}
                >
                  {res.name}
                </div>
              </div>
            </li>
          )
        }
      </ol>
    </nav>
  )
}

export default BreadCrumb