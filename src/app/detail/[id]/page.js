'use client'
import BreadCrumb from '@/app/components/BreadCrumbs'
import Loading from '@/app/components/Loading'
import Rating from '@/app/components/Ratting'
import { GetDetailRestaurant } from '@/app/services/services'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const PageDetail = ({ params }) => {
  const id = params.id
  const [allDataRestaurant, setallDataRestaurant] = useState()
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    const getAllDataDetailRestaurant = async() => {
      setisLoading(true)
      const res = await GetDetailRestaurant(id)

      setallDataRestaurant(res.data)
      setisLoading(false)
    }

    getAllDataDetailRestaurant()
  }, [])
  
  return (
    <div className='p-10'>
      <BreadCrumb 
        dataLink={[{
          name: 'Detail',
          link: '',
        }]}
      />

      {/* main */}
      {
        !isLoading ?
        <>
          <div className='mt-5 flex md:justify-between justify-center md:flex-nowrap flex-wrap items-start'>
          {/* image */}
          <div className='md:w-[50%] w-[100%]'>
            {
              allDataRestaurant &&
              <Image src={allDataRestaurant.image} alt={allDataRestaurant.name} width={590} height={400}/>
            }
          </div>

          {/* detail */}
          {
            allDataRestaurant &&
            <div className='md:w-[50%] w-[100%] p-5'>
              {/* name */}
              <div className='text-left font-semibold text-3xl mb-5'>{allDataRestaurant.name}</div>

              {/* rating */}
              <div className='mb-5'>
                <Rating value={allDataRestaurant.rating} color={'black'} text={allDataRestaurant.rating}/>
              </div>

              {/* merged category and is open */}
              <div className='flex justify-between mb-5'>
                {/* category and price */}
                <div className='text-xs font-light'>{allDataRestaurant.category.toUpperCase()} - ${allDataRestaurant.price}</div>

                {/* is open */}
                <div className='text-xs font-light'>
                  {
                    allDataRestaurant.isOpen ?
                      <div className='flex justify-center items-center'>
                        <div className='w-2 h-2 rounded-full bg-green-600 mr-1'></div>
                        <div>Open Now</div>
                      </div>
                    :
                      <div className='flex justify-center items-center'>
                        <div className='w-2 h-2 rounded-full bg-red-600 mr-1'></div>
                        <div>Closed</div>
                      </div>
                  }
                </div>
              </div>

              {/* description */}
              <div>
                <div className='font-semibold'>Description</div>
                <div>{allDataRestaurant.description}</div>
              </div>
            </div>
          }
        </div>
        </>
        :
        <div className='flex justify-center items-center w-full h-[300px]'>
          <Loading/>
        </div>
      }
    </div>
  )
}

export default PageDetail