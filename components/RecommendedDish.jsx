import { useState } from 'react'
import styles from '@/styles/components/RecommendedDish.module.scss'

function RecommendedDish({ title, img, description, price, onAddToOrder }) {
    const [showPopup, setShowPopup] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])

    const options = ['Jollof Rice', 'Fried Rice', 'Plantain', 'Meatpie', 'Puff-puff']

    const handleOptionChange = (option) => {
        setSelectedOptions(prev =>
        prev.includes(option)
            ? prev.filter(opt => opt !== option)
            : [...prev, option]
        )
    }

    const handleConfirm = () => {
        const formattedTitle = `${title} (${selectedOptions.join(', ')})`
        onAddToOrder(formattedTitle)
        setShowPopup(false)
        setSelectedOptions([])
    }

    return (
        <div className={styles.card}>
        <img src={img} alt={title} className={styles.image} />
        <h3>{title}</h3>
        <p>{description}</p>
        <p>${price}</p>
        <button onClick={() => setShowPopup(true)}>Add to Order</button>

        {showPopup && (
            <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                <h4>Select options for {title}</h4>
                {options.map(option => (
                <label key={option} className={styles.checkbox}>
                    <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                    />
                    {option}
                </label>
                ))}
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default RecommendedDish
