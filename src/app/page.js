'use client'
import Image from 'next/image'
import { GetAllDataRestaurant } from './services/services'
import { useEffect, useState } from 'react'
import CardResto from './components/CardResto'
import Loading from './components/Loading'

export default function Home() {
  const [allDataRestaurant, setallDataRestaurant] = useState()
  const [allDataCategoryRestaurant, setallDataCategoryRestaurant] = useState()
  const [isLoading, setisLoading] = useState(false)
  const [limitData, setlimitData] = useState(5)
  const [itemFilter, setitemFilter] = useState({
    isOpen: false,
    price: '',
    categories: ''
  })

  const handleChangeFilter = (key, value) => {
    setitemFilter({...itemFilter, [key]: value})
  }

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
    const getAllCategory = async () => {
      const res = await GetAllDataRestaurant(1, 20);

      setallDataCategoryRestaurant(checkDuplicateCategory(res.data))
    }

    getAllCategory()
  }, [])

  useEffect(() => {
    const getAllDataResto = async() => {
      setisLoading(true)
      const res = await GetAllDataRestaurant(1, limitData, itemFilter.categories)
      setallDataRestaurant(res.data)

      setisLoading(false)
    }

    getAllDataResto()
  }, [limitData, itemFilter.categories])

  const handleChangeLoadMore = async (limit) => {
    setlimitData(limit)
  }

  const handleClearAll = async() => {
    setisLoading(true)
    setitemFilter({
      isOpen: false,
      price: '',
      categories: ''
    })
    const res = await GetAllDataRestaurant(1, limitData, itemFilter.categories)
    setallDataRestaurant(res.data)

    setisLoading(false)
  }

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
              <input 
                id='openfilter' 
                type="checkbox" 
                checked={itemFilter.isOpen}
                className='appearance-none w-[1.3em] h-[1.3em] bg-white rounded-[50%] border-2 cursor-pointer outline-none checked:bg-blue-500 checked:border-blue-300'
                onChange={(e) => {
                  handleChangeFilter('isOpen', e.target.checked)
                }}
              />
              <label htmlFor='openfilter' className='cursor-pointer pl-2'>Open Now</label>
            </div>

            {/* filter price */}
            <div className='ml-3 mr-3 my-2 border-b-2 py-2'>
              <select 
                value={itemFilter.price}
                name="price" 
                id="price"
                onChange={(e) => {
                  handleChangeFilter('price', e.target.value)
                }}
              >
                <option value="">Price</option>
                <option value="cheapest">Cheapest</option>
                <option value="most_expensive">Most Expensive</option>
              </select>
            </div>

            {/* filter categories */}
            <div className='ml-3 mr-3 my-2 border-b-2 py-2'>
              <select 
                name="price" 
                id="price"
                value={itemFilter.categories}
                onChange={(e) => {
                  handleChangeFilter('categories', e.target.value)
                }}
              >
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
            <div 
              className='cursor-pointer px-6 py-2 border-2 hover:bg-blue-500 hover:text-white hover:border-blue-200'
              onClick={() => {handleClearAll()}}
            >
              CLEAR ALL
            </div>
          </div>
        </div>

        <div className='border-b-2'></div>
      </div>

      {/* card */}
      <div className='px-10 pt-10'>
        <div className='mb-5 text-3xl'>All Restaurants</div>

        {/* map card */}
        <div className='flex justify-center md:justify-start flex-wrap'>
          {
            (allDataRestaurant) ?
            allDataRestaurant
            .sort((a, b) => itemFilter.price === '' ? '' : itemFilter.price === 'cheapest' ? a.price - b.price : b.price - a.price)
            .filter((data) => itemFilter.isOpen ? data.isOpen === true : data)
            .map((res, index) => 
              <div key={'cardResto'+index}>
                <CardResto 
                  id={res.id} 
                  name={res.name} 
                  rating={res.rating} 
                  category={res.category} 
                  isOpen={res.isOpen} 
                  image={res.image} 
                  price={res.price}
                />
              </div>
            )
            :
            <div className='flex justify-center items-center w-full h-[300px]'>
              <Loading/>
            </div>
          }
        </div>
      </div>

      {/* button load more */}
      {
        allDataRestaurant &&
        <div className='my-8 flex justify-center'>
          {
            !isLoading ?
            <div 
              className='border-2 border-black w-[40%] py-2 text-center cursor-pointer hover:bg-[#002B56] hover:text-white'
              onClick={() => {
                handleChangeLoadMore(allDataRestaurant.length + 5)
              }}
            >
              Load More
            </div>
            :
            <div className='flex justify-center items-center w-full my-8'>
              <Loading/>
            </div>
          }
        </div>
      }
    </div>
  )
}
