import Stars from './StarRating'
import classNames from 'classnames'
import styles from '@/styles/components/Dish.module.scss'
import { useRef, useState } from 'react'

function Dish({ title, img, price, description, onAddToOrder, orderRef }) {
  const handleClick = (e) => {
    e.preventDefault()
    alert('Order added! 🎉')
    onAddToOrder(title)

    if (orderRef?.current) {
      orderRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className={styles.dish}>
      <img className={styles.dish__image} src={img} alt={title} />
      <h3 className={styles.dish__title}>{title}</h3>
      {description ? (
        <p className={styles.dish__description}>{description}</p>
      ) : null}
      <span className={styles.dish__price}>{`$${price}`}</span>
      <a onClick={handleClick} className='button'>
        add to order
      </a>
    </div>
  )
}

export default Dish
