import React from 'react'
import Container from '../components/Container'
import { Link } from 'react-router-dom'
import ss from '../assets/order.png'

const OrderComplete = () => {
  return (
    <section className="bg-center bg-cover bg-no-repeat h-[450px] sm:h-[550px] md:h-[630px] relative" style={{ backgroundImage: `url(${ss})` }}>
      <Container className="">
        <div className=''>
          <div className='text-center pt-12'>
          <h2 className='text-[#4CAF50] text-[22px] sm:text-[30px] md:text-[34px] lg:text-[36px] font-bold font-josefin pb-2'>Your Order Is Completed ✅</h2>
          <p className='text-[#4f66c1] text-[12px] sm:text-[16px] font-normal font-lato leading-[20px] sm:leading-[30px] pb-6 max-w-[500px] mx-auto'>Thank you for your order! Your order is being processed and will be completed within 6-8 hours. You will receive an email confirmation when your order is completed.
          </p>
          <div className='pb-12'>
            <Link to={"/products"} className='text-[16px] sm:text-[18px] font-semibold font-josefin bg-[#FB2E86] hover:bg-[#fb2e87bb] rounded-[5px] px-4 py-2 sm:px-8 sm:py-4 text-white'>
              Continue Shopping
            </Link>
          </div>
        </div>
        </div>
      </Container>
    </section>
  )
}

export default OrderComplete