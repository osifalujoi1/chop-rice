import Dish from './Dish'
import dishList from '@/utils/dishList'
import styles from '@/styles/components/SpecialDishes.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'


function Dishes({onAddToOrder, orderRef}) {
  return (
    <section className={styles.home} id='dishes'>
      <h3 className='sub-heading'>lunch / dinner (fri - sun)</h3>
      <h1 className='heading'>recommended combos</h1>
      <Swiper
        key='home-swiper'
        className={styles.swiper}
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        pagination={{
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true
        }}
        loop={true}
        wrapperClass='swiper-wrapper'
      >
        
        <div className='swiper-pagination'/>
        <div className={styles['dishes__container']}>
          {dishList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Dish key={index} {...item} onAddToOrder={onAddToOrder} orderRef={orderRef}/>
              </SwiperSlide>
            )
          })} 
        </div>
      </Swiper>
    </section>
  )
}

export default Dishes
