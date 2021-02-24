import React from 'react'
import Coverflow from 'react-coverflow';
import Img1 from "./back.png";
import Img2 from "./hero.png";
import Img3 from "./hiker.jpg";
import Img4 from "./too.png";
import Img5 from "./ui.jpg";

const TestimonailItem = () => {
    /*const getStars = () => {
        let count = rate
        const starsList = []
        while(count > 0){
            if(count > 0 && count < 1){
                starsList.push(<span key={'star'+count} className='halfstar'></span>)
            }else{
                starsList.push(<span key={'star'+count} className='star'></span>)
            }
            count--;
        }
        return starsList;
    }*/
    var fn = function () {
        /* do you want */  
      }
    return (
        <Coverflow
            width={960}
            height={480}
            navigation={false}
            enableHeading={false}
            displayQuantityOfSide={2}
            navigation
            infiniteScroll
            media={{
                '@media (max-width: 900px)': {
                width: '600px',
                height: '300px'
                },
                '@media (min-width: 900px)': {
                width: '960px',
                height: '600px'
                }
            }}
        >
            
                <img
                    src={Img3}
                    alt='title or description'
                    
                />
            <img src={Img1} alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
            <img src={Img2} alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
            <img src={Img4} alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
            <img src={Img5} alt='title or description' data-action="http://andyyou.github.io/react-coverflow/"/>
        </Coverflow>
    )
}

export default TestimonailItem
