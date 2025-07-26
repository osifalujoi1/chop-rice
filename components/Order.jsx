import classNames from 'classnames'
import styles from '@/styles/components/Order.module.scss'
import { Trash2 } from 'lucide-react'
import { forwardRef, useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import TermsAndConditions from './TermsAndConditions'


const Order = forwardRef(function Order({orderItems, setOrderItems, pendingOptionsItem, setPendingOptionsItem, optionsMap, optionsEqual}, ref) {
  const [showTerms, setShowTerms] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: '',
    datetime: '',
    address: '',
    message: ''
  })

    useEffect(() => {
    if (!pendingOptionsItem) {
      const next = orderItems.find(
        (item) => Object.keys(optionsMap).includes(item.title) && !item.options
      )
      if (next) {
        setPendingOptionsItem({
          title: next.title,
          index: orderItems.indexOf(next),
          options: {}
        })
      }
    }
  }, [orderItems, pendingOptionsItem])

  const handleOptionChange = (key, value) => {
    setPendingOptionsItem(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [key]: value
      }
    }))
  }

  const confirmOptions = () => {
    const newOrderItems = [...orderItems]
    const newItem = {
      title: pendingOptionsItem.title,
      options: pendingOptionsItem.options,
      quantity: 1
    }

    // Check if same meal with same options already exists
    const existingIndex = newOrderItems.findIndex(item =>
      item.title === newItem.title &&
      optionsEqual(item.options, newItem.options)
    )

    if (existingIndex !== -1) {
      alert('This item with the selected options already exists in your order. Please adjust the quantity manually if you want more.')
      // Remove the currently pending item (since it was added for options but duplicate)
      newOrderItems.splice(pendingOptionsItem.index, 1)
    } else {
      // Add new item or replace pending placeholder
      if (pendingOptionsItem.index < newOrderItems.length) {
        newOrderItems.splice(pendingOptionsItem.index, 1, newItem)
      } else {
        newOrderItems.push(newItem)
      }
    }

    setOrderItems(newOrderItems)
    setPendingOptionsItem(null)
  }


const cancelOptions = () => {
  // Remove the item from order since user cancelled options
  setOrderItems(prev => prev.filter((_, idx) => idx !== pendingOptionsItem.index))
  setPendingOptionsItem(null)
}

  const handleQuantityChange = (index, quantity) => {
    setOrderItems(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    )
  }

  const handleDelete = (index) => {
    setOrderItems(prev => prev.filter((_, i) => i !== index))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    if (orderItems.length === 0) {
    alert('Please add at least one dish.')
    return
  }

  emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, {
    name: formData.name,
    phone: formData.phone,
    comment: formData.comment,
    datetime: formData.datetime,
    address: formData.address,
    message: formData.message,
    order: orderItems.length > 0
    ? orderItems.map(i => `${i.title} x${i.quantity}`).join(', ')
    : 'No items'
}, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_API)
    .then((result) => {
      console.log('Email sent:', result.text)
      alert('Order sent! 🎉')
      setOrderItems([])
        setFormData({
          name: '',
          phone: '',
          comment: '',
          datetime: '',
          address: '',
          message: ''
        })
    }, (error) => {
      console.error('Error sending email:', error)
      alert('Error sending order.')
    })
  }



if (pendingOptionsItem) {
    return (
      <section className={styles.order} id='order' ref={ref}>
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3>Select Options for {pendingOptionsItem.title}</h3>
            <p>Prices add up for multiple items selected</p>
            {optionsMap[pendingOptionsItem.title].map(({ label, key, sizes }) => (
              <div key={key} className={styles.optionGroup}>
                {pendingOptionsItem.title === 'Meal prep / Catering Services' && (
                  <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{label}</p>
                )}
                {sizes ? (
                  sizes.map((size) => (
                    <label key={`${key}-${size}`} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name={key}
                        value={size}
                        checked={pendingOptionsItem.options[key] === size}
                        onChange={(e) => handleOptionChange(key, e.target.value)}
                      />
                      {size}
                    </label>
                  ))
                ) : (
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={!!pendingOptionsItem.options[key]}
                      onChange={(e) => handleOptionChange(key, e.target.checked)}
                    />
                    {label}
                  </label>
                )}
              </div>
            ))}
            <div className={styles.popupButtons}>
              <button
                type="button"
                onClick={confirmOptions}
                className={classNames('button', styles.button)}
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={cancelOptions}
                className={classNames('button', styles.cancelButton)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }



  return (
    <section className={styles.order} id='order' ref={ref}>
      {/* <h3 className='sub-heading'>order now</h3> */}
      <h1 className='second-heading'>order now</h1>


      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.order__container}>
          <div className={styles.form__item}>
            <span className={styles.label}>order</span>
            {orderItems.length === 0 ? (
              <p style={{ opacity: 0.6, color: 'white', fontSize: '1.5em' }}>No meals added yet.</p>
            ) : (
              
              <ul className={styles.orderList} >
                {orderItems.map(({ title, quantity, options }, index) => (
                  <li key={`${title}-${index}`} className={styles.orderItem}>
                    <span>{title}</span>
                    {options && (
                      <small style={{ fontStyle: 'italic', marginLeft: '0.5rem', color: '#ccc' }}>
                        (
                        {Object.entries(options)
                          .filter(([_, val]) => val) // ignore false or empty options
                          .map(([key, val]) => {
                            const option = optionsMap[title]?.find(opt => opt.key.trim() === key.trim())
                            
                            // If radio-style option (value is string like "Large $50")
                            if (typeof val === 'string') {
                              return option ? `${option.label}: ${val}` : `${key}: ${val}`
                            }

                            // If checkbox (boolean), show only label
                            return option?.label ?? key
                          })
                          .join(', ')}
                        )
                      </small>
                    )}
                    
                    <input
                      type="number"
                      min="1"
                      className={styles.quantityInput}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className={styles.deleteButton}
                      aria-label={`Remove ${title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.order__container}>
          <div className={styles.form__item}>
            <span className={styles.label}>name</span>
            <input
              className={styles.input}
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='enter your name'
              required
            ></input>
          </div>
          <div className={styles.form__item}>
            <span className={styles.label}>phone number</span>
            <input
              className={styles.input}
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='enter your number'
              required
            ></input>
          </div>
        </div>
        <div className={styles.order__container}>
          <div className={styles.form__item}>
            <span className={styles.label}>additional comment</span>
            <input
              className={styles.input}
              type='text'
              name='comment'
              value={formData.comment}
              onChange={handleChange}
              placeholder='enter allergies or other dietary restrictions...'
            ></input>
          </div>
          <div className={styles.form__item}>
            <span className={styles.label}>date and time</span>
            <input
              className={styles.input}
              type='datetime-local'
              name='datetime'
              value={formData.datetime}
              onChange={handleChange}
              placeholder='date and time'
              required
            ></input>
          </div>
        </div>
        <div className={styles.order__container}>
          <div className={styles.form__item}>
            <span className={styles.label}>address (Optional)</span>
            <textarea
              className={styles.input}
              name='address'
              rows='4'
              value={formData.address}
              onChange={handleChange}
              placeholder='enter your address'
            ></textarea>
          </div>
          <div className={styles.form__item}>
            <span className={styles.label}>message</span>
            <textarea
              className={styles.input}
              name='message'
              value={formData.message}
              onChange={handleChange}
              rows='4'
              placeholder='select choice of rice, inquire about delivery options or large catering services...'
            ></textarea>
          </div>
        </div>
        <div className={styles.order__container}>
        <label className={classNames('checkboxLabel', styles.checkboxLabel)}>
          By clicking "Order Now", you agree to the following {' '} 
          <span
            className={styles.termsLink}
            onClick={() => setShowTerms(true)}
            style={{textDecoration:'underline'}}
          >
          Terms and Conditions
          </span>
        </label>
        </div>
        <input
          type='submit'
          value='order now'
          className={classNames('button', styles.button, 'formButton', styles.formButton)}
        />
      </form>
      <TermsAndConditions
        active={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </section>
  )
})

export default Order
