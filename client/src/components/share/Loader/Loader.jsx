import ReactDOM from 'react-dom'

import classes from './Loader.module.css'

const Backdrop = () => {
  return (
    <div className={classes.backdrop} />
  )
}
 
const Icon = () => {
  return (
    <div className={classes["lds-facebook"]}><div></div><div></div><div></div></div>
  )
}

const Loader = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('modal')
      )}
      {ReactDOM.createPortal(
        <Icon />,
        document.getElementById('modal')
      )}
    </>
  )
}

export default Loader