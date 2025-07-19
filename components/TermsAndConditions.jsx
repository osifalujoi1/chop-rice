// TermsAndConditions.jsx
import { useState } from 'react'
import styles from '@/styles/components/TermsAndConditions.module.scss'
import classNames from 'classnames'


const TermsAndConditions = ({ active, onClose }) => {
    return (
        <section className={classNames('terms', styles.terms, { [styles['active-terms']]: active })}>
        <h2>Terms and Conditions</h2>
        <span
            className={classNames(styles['terms__close-icon'])}
            onClick={onClose}
        >&times;</span>
        <p>
            Welcome to Chop rice! We are excited to bring delight to your taste buds. By placing an order with us, you agree to the following terms and conditions:
        </p>
        <ul>
            <li>Orders are subject to availability and confirmation.</li>
            <li>Please provide accurate and complete information during the order process.</li>
            <li>We reserve the right to cancel orders due to unforeseen circumstances.</li>
            <li>Allergy and dietary requirements must be clearly communicated.</li>
            <li>We are not liable for any allergic reactions if information is not provided.</li>
            <li>Delivery times are estimates and not guaranteed.</li>
            <li>
            <strong>Refund Policy:</strong> We offer a refund of 80% of the order value for cancellations made at least 24 hours before the scheduled delivery or pickup. Refunds for cancellations made within 24 hours of delivery/pickup are not guaranteed.
            </li>
        </ul>
        </section>
    )
}

export default TermsAndConditions
