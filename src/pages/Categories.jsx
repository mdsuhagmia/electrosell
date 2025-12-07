import React, { useContext, useEffect, useState } from 'react';
import Container from '../components/Container';
import { apiData } from '../components/ContextApi';
import { useNavigate } from 'react-router-dom';
import { FaLaptop, FaTshirt, FaGem, FaFemale } from 'react-icons/fa';

const categoryIcons = {
  "men's clothing": FaTshirt,
  "jewelery": FaGem,
  "electronics": FaLaptop,
  "women's clothing": FaFemale,
};

const Categories = () => {
  let data = useContext(apiData);
  let [category, setCategory] = useState([]);

  useEffect(() => {
    setCategory([...new Set(data.map((item) => item.category))]);
  }, [data]);

  let navigate = useNavigate();

  let handleCate = (citem) => {
    let cateFill = data.filter((item) => item.category === citem);
    navigate('/products', { state: { cateData: cateFill, category: citem } });
  };

  return (
    <section className='py-12 bg-gray-200'>
      <Container>
        <div className='grid grid-cols-2 md:grid-cols-4 text-center gap-x-4'>
          {category.map((item, index) => (
            <h2
              key={index}
              onClick={() => handleCate(item)}
              className='capitalize flex flex-col items-center justify-center space-y-2 text-violet-950 font-bold font-jose text-2xl hover:bg-gray-100 cursor-pointer hover:text-violet-700 transition-all duration-500 ease-in-out bg-white py-8 rounded-[5px] mb-4'
            >
              {React.createElement(categoryIcons[item.toLowerCase()] || FaGem, {
                size: 36,
                className: "text-violet-700"
              })}
              {item}
            </h2>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Categories;