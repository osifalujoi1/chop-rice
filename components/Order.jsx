import classNames from 'classnames'
import styles from '@/styles/components/Order.module.scss'
import { Trash2 } from 'lucide-react'
import { forwardRef, useState } from 'react'
import emailjs from 'emailjs-com'
import TermsAndConditions from './TermsAndConditions'


const Order = forwardRef(function Order(props, ref) {
  const { orderItems, setOrderItems } = props

  const [showTerms, setShowTerms] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: '',
    datetime: '',
    address: '',
    message: ''
  })
  const handleQuantityChange = (title, quantity) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.title === title
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    )
  }

  const handleDelete = (title) => {
    setOrderItems(prev => prev.filter(item => item.title !== title))
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

  emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, {
    name: formData.name,
    phone: formData.phone,
    comment: formData.comment,
    datetime: formData.datetime,
    address: formData.address,
    message: formData.message,
    order: orderItems.length > 0
    ? orderItems.map(i => `${i.title} x${i.quantity}`).join(', ')
    : 'No items'
}, process.env.EMAILJS_PUBLIC_API)
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

  return (
    <section className={styles.order} id='order' ref={ref}>
      {/* <h3 className='sub-heading'>order now</h3> */}
      <h1 className='second-heading'>order now</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.order__container}>
          <div className={styles.form__item}>
            <span className={styles.label}>order</span>
            {orderItems.length === 0 ? (
              <p style={{ opacity: 0.6, color: 'white', fontSize: '1.5em' }}>No dishes added yet.</p>
            ) : (
              <ul className={styles.orderList}>
                {orderItems.map(({ title, quantity }) => (
                  <li key={title} className={styles.orderItem}>
                    <span>{title}</span>
                    <input
                      type="number"
                      min="1"
                      className={styles.quantityInput}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(title, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(title)}
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
              placeholder='inquire about delivery options or large catering services...'
            ></textarea>
          </div>
        </div>
        <div className={styles.order__container}>
        <label className={classNames('checkboxLabel', styles.checkboxLabel)}>
          <input
            type="checkbox"
            name="agree"
            required
          />
          I agree to the {' '} 
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
