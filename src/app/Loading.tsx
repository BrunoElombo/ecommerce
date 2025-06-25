import React from 'react'

const Loading = ({color}:{color:string}) => {
  return (
    <div className="h-20 flex items-center justify-center">
        <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-${color}`}></div>
    </div>
  )
}

export default Loading