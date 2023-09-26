'use client'
import Image from 'next/image'
import { GetAllDataRestaurant } from './services/services'
import { useEffect, useState } from 'react'

export default function Home() {
  const [allDataRestaurant, setallDataRestaurant] = useState()
  const [allDataCategoryRestaurant, setallDataCategoryRestaurant] = useState()

  const checkDuplicateCategory = (myData) => {
    const duplicateCheck = [];

    myData.map((data, index) => {
      if (duplicateCheck.includes(data.category.toLowerCase()))
        return null;
      duplicateCheck.push(data.category.toLowerCase())
        return data;
    }).filter((e)=>(e))

    return duplicateCheck
  }

  useEffect(() => {
    const getAllDataResto = async() => {
      const res = await GetAllDataRestaurant()
      setallDataRestaurant(res.data)

      setallDataCategoryRestaurant(checkDuplicateCategory(res.data))
    }

    getAllDataResto()
  }, [])

  return (
    <div>
      {/* title */}
      <div className='p-10'>
        <div className='font-light text-5xl mb-5'>Restaurants</div>
        <div className='max-w-[650px] font-extralight'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s</div>
      </div>

      {/* navigation */}
      <div>
        <div className='border-b-2'></div>

        <div className='my-4 px-10 flex md:justify-between justify-center items-center md:flex-nowrap flex-wrap'>
          <div className='flex md:justify-start justify-center items-center md:flex-nowrap flex-wrap'>
            <div>Filter By:</div>

            {/* filter open */}
            <div className='flex justify-start items-center ml-3 mr-3 my-2 border-b-2 py-2'>
              <input id='openfilter' type="checkbox" className='appearance-none w-[1.3em] h-[1.3em] bg-white rounded-[50%] border-2 cursor-pointer outline-none checked:bg-blue-500 checked:border-blue-300'/>
              <label htmlFor='openfilter' className='cursor-pointer pl-2'>Open Now</label>
            </div>

            {/* filter price */}
            <div className='ml-3 mr-3 my-2 border-b-2 py-2'>
              <select name="price" id="price">
                <option value="">Price</option>
                <option value="cheapest">Cheapest</option>
                <option value="most_expensive">Most Expensive</option>
              </select>
            </div>

            {/* filter categories */}
            <div className='ml-3 mr-3 my-2 border-b-2 py-2'>
              <select name="price" id="price">
                <option value="">Categories</option>
                {
                  allDataCategoryRestaurant &&
                  allDataCategoryRestaurant.map((res, index) =>
                    <option key={'category'+index} value={res} className='capitalize'>{res}</option>
                  )
                }
              </select>
            </div>
          </div>

          <div>
            <div className='cursor-pointer px-6 py-2 border-2 hover:bg-blue-500 hover:text-white hover:border-blue-200'>CLEAR ALL</div>
          </div>
        </div>

        <div className='border-b-2'></div>
      </div>

      {/* card */}
    </div>
  )
}
