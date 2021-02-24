import React from 'react'
import PropertyCard from './PropertyCard'

const PropertiesGrid = ({properties}) => {
    return (
        <div className='properties-grid container mt-5'>
            <div className='row justify-content-start '>
              
                {    properties.length < 1 ? <span>...</span> : (
                        properties.map(prp => (
                            <div key={prp._id+'-property'} className='property col-xl-4 col-lg-4  col-md-6 col-sm-6 mb-5'>
                                <PropertyCard property={prp}/>
                            </div>
                        ))
                    )
                }
           </div>
        </div>
    )
}

export default PropertiesGrid
