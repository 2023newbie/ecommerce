import classes from './Header.module.css'

const Header = ({type}) => {
  return (
    <header className={classes.header}>
      <span className={classes.big}>{type}</span>
      <span className={classes.small}>{type}</span>
    </header> 
  )
}

export default Header