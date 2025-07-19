import SpecialDishes from './SpecialDishes'
import Dishes from './Dishes'
import About from './About'
import Menu from './Menu'
import Reviews from './Reviews'
import Order from './Order'
import styles from '@/styles/components/Main.module.scss'
import HomeImage from './HomeImage'
import { useRef, useState } from 'react'

function Main() {
  const [orderItems, setOrderItems] = useState([])
  const orderRef = useRef(null)

  const handleOrderItems = (title) => {
    setOrderItems((prev) => {
      const existing = prev.find(item => item.title === title)
      if (existing) {
      return prev.map(item =>
        item.title === title
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      return [...prev, { title, quantity: 1 }]
    }
    })
  }

  return (
    <main className={styles.main}>
      <HomeImage />
      {/* <Dishes /> */}
      {/* <About /> */}
      <Menu onAddToOrder={handleOrderItems} orderRef={orderRef}/>
      {/* <Reviews /> */}
      <Order ref={orderRef} orderItems={orderItems} setOrderItems={setOrderItems}/>
      {/* <SpecialDishes/> */}
    </main>
  )
}

export default Main
