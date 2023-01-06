import React from 'react'

function NotFoundPage() {
  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <h1 className='text-[404px]'>404</h1>
      <div className='text-lg'>🎉Congratulations! You found the <span className="font-semibold">not found page</span> !🎉</div>
    </div>
  )
}

export default NotFoundPage