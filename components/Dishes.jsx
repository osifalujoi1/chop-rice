import Dish from './Dish'
import dishList from '@/utils/dishList'
import styles from '@/styles/components/Dishes.module.scss'

function Dishes({onAddToOrder, orderRef}) {
  return (
    <section className={styles.dishes} id='dishes'>
      <h3 className='sub-heading'>lunch / dinner (fri - sun)</h3>
      <h1 className='heading'>recommended combos</h1>
      <div className={styles['dishes__container']}>
        {dishList.map((item, index) => {
          return <Dish key={index} {...item} onAddToOrder={onAddToOrder} orderRef={orderRef}/>
        })}
      </div>
    </section>
  )
}

export default Dishes
