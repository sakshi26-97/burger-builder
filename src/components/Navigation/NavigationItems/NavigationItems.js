import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      {/* for boolean value only defining key assumes it is true like in active */}
      <NavigationItem link='/' exact>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
  )
}


export default navigationItems
