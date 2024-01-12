import React from 'react'
import classes from './Banner.module.css'
import { Link } from 'react-router-dom'
import url from '../../util/url'

const Banner = ({path}) => {
  return (
    <div className={classes.banner}>
        <div className={classes.subBanner}>
            <span className={classes['sub-title']}>NEW INSPIRATION 2023</span><br/>
            <span className={classes.big}>20% OFF ON NEW SEASON</span><br/>
            <button className={classes.button}><Link to='/shop?type=all'>Browse collections</Link></button>
        </div>
        <img src={`${url.root}/${path}`} alt="banner" width='100%' />
    </div> 
  )
}

export default Banner