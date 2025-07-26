import Dish from './Dish'
import menuDishList from '@/utils/menuDishList'
import styles from '@/styles/components/Menu.module.scss'

function Menu({onAddToOrder, orderRef}) {
  return (
    <section className={styles.menu} id='menu'>
      <h3 className='sub-heading'>lunch / dinner (fri - sun)</h3>
      <h1 className='heading'>Our Menu</h1>
      <div className={styles.menu__container}>
        {menuDishList.map((menu, index) => {
          return <Dish key={index} {...menu} onAddToOrder={onAddToOrder} orderRef={orderRef}/>
        })}
      </div>
    </section>
  )
}

export default Menu
