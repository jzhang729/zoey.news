import React from 'react'
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap'

export default React.createClass({
  handleClick: function(ek){
    console.log(ek)
  },  
  render: function(){
    return(
     <Navbar brand='ZOEY'>
        <Nav>
          <NavItem eventKey={1} onClick={this.handleClick}>Link</NavItem>
          <NavItem eventKey={2} onClick={this.handleClick}>Link</NavItem>
          <DropdownButton eventKey={3} title='Dropdown'>
            <MenuItem eventKey='1'>Action</MenuItem>
            <MenuItem eventKey='2'>Another action</MenuItem>
            <MenuItem eventKey='3'>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey='4'>Separated link</MenuItem>
          </DropdownButton>
        </Nav>
      </Navbar>
    )
  }
})