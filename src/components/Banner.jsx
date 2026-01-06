import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

const Banner = () => {

  let [data, setData] = useState([])
  const getData = ()=>{
    axios.get("https://es-back-xv9z.onrender.com/api/banner").then((res)=>{
      setData(res.data.payload.banner)
    })
  }

  useEffect(()=>{
    getData()
  })

  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (
    <section className="">
      <div className="">
        <Slider {...settings} className="banSlick">
          {data.map((item)=>(
            <img src={item.image} className='h-96' alt="" />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Banner