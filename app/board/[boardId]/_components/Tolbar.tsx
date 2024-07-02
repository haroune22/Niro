"use client"

export const Tolbar = () => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 '>
        <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
            <div className="">Pencil</div>
            <div className="">cirlce</div>
            <div className="">Pencil</div>
        </div>
        <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
            <div className="">Undo</div>
            <div className="">Redo</div>
        </div>
    </div>
  )
}

export const TolbarSkeleton = () => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md'/>
  )
}
