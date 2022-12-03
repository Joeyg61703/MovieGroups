import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const PageNavBar = ({genre, pageNumber}) => {


    

    const navigate = useNavigate();
    const [numberList, setNumberList] = useState([])
    

    useEffect(() => {
        const maxNumber = 50;
        let tempArr = [];
        let currentVal = pageNumber - 3;
        if(maxNumber - pageNumber < 5)
            currentVal = maxNumber - 5;
        while(tempArr.length < 7 && currentVal <= maxNumber){
            if(currentVal >= 1 && currentVal <= maxNumber)
                tempArr.push(currentVal)

            currentVal += 1;
        }
        setNumberList(tempArr);


    }, [])
    
  return (
    <div className=" d-flex justify-content-center align-items-evenly w-100 text-center" >
        {numberList.map(number => {
        return (
         <Link onClick={() => {window.location.href=`/genre/${genre}/${number}`}} key={number} className={`${number == pageNumber ? "title-red" : "text-white"} page-button`}>
            <div className="">
                <span className="h3">{number}</span>
            </div>
         </Link>   
        )})}
    </div>
  )
}

export default PageNavBar