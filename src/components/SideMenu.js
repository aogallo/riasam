import React from 'react'
import { Icon, Image, Menu, Sidebar } from 'semantic-ui-react'

const SideMenu = () => (
    <Sidebar
      as={Menu}
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
    >
      <Menu.Item as='a'>
        <Image  src='https://react.semantic-ui.com/images/wireframe/square-image.png' 
        size= 'tiny'
        centered
        circular/>
        username 
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='gamepad' />
        Games
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
    </Sidebar>

)


export default SideMenu;