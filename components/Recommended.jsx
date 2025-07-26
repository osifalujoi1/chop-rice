import dishList from '@/utils/dishList'
import RecommendedDish from './RecommendedDish'
import styles from '@/styles/components/Recommended.module.scss'

function Recommended({ onAddToOrder }) {
    return (
        <section className={styles.section}>
        <h3 className='sub-heading'>recommended dishes</h3>
        <h1 className='heading'>popular picks</h1>
        <div className={styles.container}>
            {dishList.map(dish => (
            <RecommendedDish key={dish.id} {...dish} onAddToOrder={onAddToOrder} />
            ))}
        </div>
        </section>
    )
}

export default Recommended
