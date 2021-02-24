import React from 'react'

const pageSize = 4;

const SmallPager = ({page, documentsCount, setPage}) => {
    const arr = new Array(12/pageSize).fill(0)
    

    return (
        <div className='row justify-content-center mb-3'>
            {
                 arr.map((p, i) => (
                    <button key={`btn-${i+1}`} onClick={e => setPage(e, i+1)} className={`pager-btn ${page === i+1 ? 'active' : ''}`}>{i+1}</button>
                ))
            }
         
        </div>
    )
}

export default SmallPager
