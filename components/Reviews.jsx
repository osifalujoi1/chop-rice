import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import Review from './Review'
import reviewList from '@/utils/reviewList'
import styles from '@/styles/components/Reviews.module.scss'

function Reviews() {
  return (
    <section className={styles.reviews} id='reviews'>
      <h3 className='sub-heading'>customer reviews</h3>
      <h1 className='heading'>what they say</h1>
      <div className={styles.reviews__container}>
        <Swiper
          key="swiper-review"
          className={styles.reviews__swiper}
          modules={[Autoplay]}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false
          }}
          loop={false}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            640: {
              slidesPerView: 2
            },
            1280: {
              slidesPerView: 3
            }
          }}
        >
          {reviewList.map((review) => {
            return (
              <SwiperSlide key={review.id || review.name || review.img || review.msg}>
                <Review {...review} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  )
}

export default Reviews
