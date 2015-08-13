import React from 'react'
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap'
import { TabbedArea, TabPane } from 'react-bootstrap'

export default React.createClass({

  render: function() {
    return (
    <div className="header">
        <Navbar className="navbar" brand='Zoey' toggleNavKey={0}>
          <Nav right eventKey={0}> {/* This is the eventKey referenced */}
            <NavItem eventKey={1} href='#'>Link</NavItem>
            <NavItem eventKey={2} href='#'>Link</NavItem>
            <DropdownButton eventKey={3} title='Dropdown'>
              <MenuItem eventKey='1'>Action</MenuItem>
              <MenuItem eventKey='2'>Another action</MenuItem>
              <MenuItem eventKey='3'>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey='4'>Separated link</MenuItem>
            </DropdownButton>
          </Nav>
        </Navbar>
        <div className="tabs">
             <TabbedArea defaultActiveKey={1} animation={false}>
               <TabPane eventKey={1} tab='Donald Trump'></TabPane>
               <TabPane eventKey={2} tab='Rosie O Donnell'></TabPane>
               <TabPane eventKey={3} tab='Stephen Harper'></TabPane>
               <TabPane eventKey={4} tab='Justin Trudeau'></TabPane>
               <TabPane eventKey={5} tab='Thomas Mulcair'></TabPane>
             </TabbedArea>
        </div>
    </div>
    )
  }
})

