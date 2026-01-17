import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import api from '../api/axios';

const Banner = () => {
 const [data, setData] = useState([]);

  useEffect(() => {
    const getBanner = async () => {
      try {
        const res = await api.get("/banner");
        setData(res.data.payload);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };
    getBanner();
  }, []);

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

  const navigate = useNavigate();

  const handleCategory = (slug)=>{
    navigate(`/products/${slug}`);
  }


  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-0 2xl:px-12">
        <Slider {...settings} className="banSlick">
          {data.map((item, i) => (
            <img src={item.image} key={i} onClick={() => handleCategory(item.product?.slug)} className="h-86 cursor-pointer" alt="" />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Banner