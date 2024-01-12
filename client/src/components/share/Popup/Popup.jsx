import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import classes from './Popup.module.css'
import { Link } from 'react-router-dom'

const Backdrop = props => {
  return (
    <div
      className={classes.backdrop}
      onClick={props.onClick}
    />
  )
}

const ModalOverlay = props => {
  return (
    <main className={classes.modal}>
      <picture>
        <img src={props.img1} alt={props.name} width="100%" />
      </picture>
      <section>
        <h2 className={classes.head}>
          <i>{props.name}</i>
        </h2>
        <p className={`${classes.silver} ${classes.price}`}>
          <i>{props.price} VND</i>
        </p>
        <p className={`${classes.silver} ${classes.desc}`}>
          <i>{props.short_desc}</i>
        </p>
        <Link to={`/detail/${props._id}`} className={classes.button} onClick={props.onClick}>
          <i className="fa-sharp fa-solid fa-cart-shopping"></i>
          &nbsp;View Detail
        </Link>
      </section>
      <button className={classes.close} onClick={props.onClick}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </main>
  )
}

const Popup = ({product, hide}) => {

  useEffect(() => { // close modal  by escape key
    const closeModalByEsc = (e) => {
      if (e.keyCode === 27) {
        hide()
      }
    }
    window.addEventListener('keydown', closeModalByEsc)

    return () => {
      window.removeEventListener('keydown', closeModalByEsc)
    }
  }, [hide])

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={hide} />,
        document.getElementById('modal')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay {...product} onClick={hide} />,
        document.getElementById('modal')
      )}
    </>
  )
}

export default Popup
