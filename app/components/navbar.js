import React from 'react'
import { Navbar, Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap'
import { TabbedArea, TabPane } from 'react-bootstrap'

export default React.createClass({

  render: function() {
    return (
      <div className="header">
      <h1 className="title">Zoey</h1>
          <div className="flex-wrapper">
            <ul className="flex-tabs">
              <li>Donald Trump</li>
              <li>Thomas Mulcair</li>
              <li>Justin Trudeau</li>
              <li>Canadian Election</li>
              <li>Health Care</li>
              <li>Taxes</li>
              <li>ISIS</li>
              <li>Terrorism</li>
            </ul>
          </div>
      </div>
    )
  }
})

           // <Nav right eventKey={0}> {/* This is the eventKey referenced */}
           //     <NavItem eventKey={1} href='#'></NavItem>
           //     <NavItem eventKey={2} href='#'>Link</NavItem>
           //     <DropdownButton eventKey={3} title='Dropdown'>
           //       <MenuItem eventKey='1'>Action</MenuItem>
           //       <MenuItem eventKey='2'>Another action</MenuItem>
           //       <MenuItem eventKey='3'>Something else here</MenuItem>
           //       <MenuItem divider />
           //       <MenuItem eventKey='4'>Separated link</MenuItem>
           //     </DropdownButton>
           // </Nav>

      //     <div className="header">
      // <h1>Zoey</h1>
      // 


          //   <div className="tabs">
          //      <TabbedArea defaultActiveKey={1} animation={false}>
          //        <TabPane eventKey={1} tab='Donald Trump'></TabPane>
          //        <TabPane eventKey={2} tab='Rosie O Donnell'></TabPane>
          //        <TabPane eventKey={3} tab='Stephen Harper'></TabPane>
          //        <TabPane eventKey={4} tab='Justin Trudeau'></TabPane>
          //        <TabPane eventKey={5} tab='Thomas Mulcair'></TabPane>
          //      </TabbedArea>
          // </div>