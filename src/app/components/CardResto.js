import Image from 'next/image'
import React from 'react'

const CardResto = ({ id, name, rating, category, isOpen, image, price }) => {
  return (
    <div className='p-4'>
      <Image src={image} alt={name} width={260} height={300}/>

      {/* name */}
      <div className='mt-3'>{name}</div>

      {/* rating */}
      <div>***</div>

      {/* merged category and is open */}
      <div className='flex justify-between'>
        {/* category and price */}
        <div className='text-xs font-light'>{category.toUpperCase()} - ${price}</div>

        {/* is open */}
        <div className='text-xs font-light'>
          {
            isOpen ?
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

      {/* button learn more */}
      <div className='mt-6'>
        <div className='bg-[#002B56] text-center text-white py-2 cursor-pointer hover:bg-gray-600'>LEARN MORE</div>
      </div>
    </div>
  )
}

export default CardResto