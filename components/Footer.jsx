import styles from '@/styles/components/Footer.module.scss'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__column}>
          <h3 className={styles.title}>locations</h3>
          {/* <a href='#' className={styles.footer__link}>
            india
          </a>
          <a href='#' className={styles.footer__link}>
            japan
          </a> */}
          <a href='#' className={styles.footer__link}>
            Northern Kentucky
          </a>
          <a href='#' className={styles.footer__link}>
            Cincinnati, Ohio
          </a>
        </div>
        <div className={styles.footer__column}>
          <h3 className={styles.title}>quick links</h3>
          <a href='#' className={styles.footer__link}>
            home
          </a>
          {/* <a href='#' className={styles.footer__link}>
            dishes
          </a>
          <a href='#' className={styles.footer__link}>
            about
          </a> */}
          <a href='#' className={styles.footer__link}>
            menu
          </a>
          {/* <a href='#' className={styles.footer__link}>
            review
          </a> */}
          <a href='#' className={styles.footer__link}>
            order
          </a>
        </div>
        <div className={styles.footer__column}>
          <h3 className={styles.title}>contact info</h3>
          {/* <a href='#' className={styles.footer__link}>
            +1 859-496-0548
          </a> */}
          {/* <a href='#' className={styles.footer__link}>
            +1 859-496-0157
          </a> */}
          <a href='#' className={styles.footer__link}>
            osifalujoboluwatife@gmail.com
          </a>
          {/* <a href='#' className={styles.footer__link}>
            posifalujo@gmail.com
          </a> */}
          {/* <a href='#' className={styles.footer__link}>
            cold spring, KY.
          </a> */}
        </div>
        <div className={styles.footer__column}>
          <h3 className={styles.title}>follow us</h3>
          <a href='https://www.instagram.com/chopp.riceee/' className={styles.footer__link}>
            instagram
          </a>
          <a href='https://www.linkedin.com/in/bolu-osifalujo-03b066227/' className={styles.footer__link}>
            linkedin
          </a>
        </div>
      </div>
      <div className={styles.footer__credit}>
        Copyright @ 2025 by{' '}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://github.com/osifalujoi1'
        >
          osifalujoi1
        </a>
      </div>
    </footer>
  )
}

export default Footer
