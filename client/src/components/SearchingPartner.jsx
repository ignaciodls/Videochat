import React from 'react'
import ReactLoading from 'react-loading';

const SearchingPartner = () => {
    return (
        <div className='searchingPartnerBox'>
            <ReactLoading type={'spinningBubbles'} color={'white'} height={40} width={40} />
        </div>
    )
}

export default SearchingPartner
