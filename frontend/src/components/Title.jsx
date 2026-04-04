import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <div className='inline-flex items-center gap-3'>
            <h2 className='text-2xl sm:text-3xl font-bold'>
                <span className='text-gray-500'>{text1}</span>{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400'>
                    {text2}
                </span>
            </h2>
            <div className='w-12 sm:w-16 h-1 rounded-full bg-gradient-to-r from-white/50 to-transparent' />
        </div>
    )
}

export default Title;