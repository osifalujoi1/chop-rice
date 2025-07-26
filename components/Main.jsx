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
  const [pendingOptionsItem, setPendingOptionsItem] = useState(null)
  const orderRef = useRef(null)

  const optionsMap = {
      'Rice combo': [
        { label: 'Drumstick', key: 'drumstick' },
        { label: 'Wings', key: 'wings ' },
      ],
      'Meal prep / Catering Services': [
        { label: 'Puff-puff', key: 'puffpuff', sizes: ['Small $20', 'Medium $38', 'Large $70'] },
        { label: 'Gizzdodo ', key: 'gizzdodo', sizes: ['Small $25', 'Medium $45', 'Large $60'] },
        { label: 'Meat-pie', key: 'meatpie', sizes: ['Small $15', 'Medium $29', 'Large $55'] },
        { label: 'Drumstick', key: 'drumstick', sizes: ['Small $12.50', 'Medium $34', 'Large $60'] },
        { label: 'Wings', key: 'wings', sizes: ['Small $15', 'Medium $28', 'Large $55'] },
        { label: 'Whole Tilapia Grilled Fish', key: 'fish', sizes: ['Small $50', 'Medium $95', 'Large $135'] },
        { label: 'Jollof/Fried Rice', key: 'rice', sizes: ['Small $30', 'Medium $55', 'Large $75'] },
      ],
      'drumstick with choice of rice': [
        { label: 'jollof rice', key: 'jollof'},
        { label: 'fried rice', key: 'fried'},
      ],
      'wings with choice of rice': [
        { label: 'jollof rice', key: 'jollof'},
        { label: 'fried rice', key: 'fried'},
      ],
      'whole tilapia fish with choice of rice': [
        { label: 'jollof rice', key: 'jollof'},
        { label: 'fried rice', key: 'fried'},
      ],
    }

  const optionsEqual = (opts1 = {}, opts2 = {}) => {
      const keys1 = Object.keys(opts1).sort()
      const keys2 = Object.keys(opts2).sort()
      if (keys1.length !== keys2.length) return false
      for (let i = 0; i < keys1.length; i++) {
        if (keys1[i] !== keys2[i]) return false
        if (opts1[keys1[i]] !== opts2[keys2[i]]) return false
      }
      return true
    }
  
    const addItemToOrder = (title) => {
      const requiresOptions = Object.keys(optionsMap).includes(title)
      const existingItems = orderItems.filter(item => item.title === title)
  
      if (requiresOptions) {
        // Check if any existing item with this title has no options yet (needs option selection)
        const noOptionsItem = existingItems.find(item => !item.options)
        if (noOptionsItem) {
          setPendingOptionsItem({
            title,
            index: orderItems.indexOf(noOptionsItem),
            options: {}
          })
          return
        }
  
        // If all existing items have options, ask user to select options for the new item
        setPendingOptionsItem({
          title,
          index: orderItems.length, // new item to be added after confirm
          options: {}
        })
  
      } else {
        // No options required - if exists increase quantity, else add new
        if (existingItems.length > 0) {
          setOrderItems(prev =>
            prev.map(item =>
              item.title === title
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          )
        } else {
          setOrderItems(prev => [...prev, { title, quantity: 1 }])
        }
      }
    }
    

  return (
    <main className={styles.main}>
      <HomeImage onAddToOrder={addItemToOrder} orderRef={orderRef}/>
      {/* <SpecialDishes/> */}
      {/* <Recommended onAddToOrder={addItemToOrder} /> */}
      <Dishes onAddToOrder={addItemToOrder} orderRef={orderRef}/>
      {/* <About /> */}
      <Menu onAddToOrder={addItemToOrder} orderRef={orderRef}/>
      {/* <Reviews /> */}
      <Order ref={orderRef} orderItems={orderItems} setOrderItems={setOrderItems} pendingOptionsItem={pendingOptionsItem} setPendingOptionsItem={setPendingOptionsItem} optionsMap={optionsMap} optionsEqual={optionsEqual}/>
      
    </main>
  )
}

export default Main
