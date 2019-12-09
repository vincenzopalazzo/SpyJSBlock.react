import Loading from 'react-loading-animation';

require('normalize.css/normalize.css');
require('styles/App.css');

//https://github.com/material-components/material-components-web-react/tree/master/packages/top-app-bar
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-drawer/dist/drawer.css';

import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-icon-button/dist/icon-button.css';

import '@material/react-layout-grid/dist/layout-grid.css';
import '@material/react-list/dist/list.css';

import React from 'react';

import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer';
import IconButton from '@material/react-icon-button';
import { IconContext } from "react-icons";
import {GoMarkGithub} from 'react-icons/go'
import List, {ListItem, ListItemText, ListItemGraphic} from '@material/react-list';

import NGraphContainer from 'components/ngraph/NGraphContainer';


class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer(value) {
    this.setState({open: value});
  }

  render() {
    return (
      <div className="container-app">
       <Drawer
          modal
          dismissible={true}
          open={this.state.open}
          className="content-drawer"
        >
          <IconButton className="drawer-icon-button-personal"
                      onClick={() => this.openDrawer(false)}>
            <MaterialIcon icon='close'/>
          </IconButton>
          <DrawerTitle tag="h2" className="drawer-title">
            <div>
              <img src="../images/vincenzopalazzoicon.png" className="author"/>
              <p>Vincenzo Palazzo</p>
            </div>
          </DrawerTitle>
          <DrawerContent tag="main">
            <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>

              <List singleSelection selectedIndex={this.state.selectedIndex}>
                <ListItem  onClick={() => window.open('https://vincenzopalazzo.github.io/')}>
                  <ListItemGraphic graphic={<GoMarkGithub/>} />
                  <ListItemText className='text-white' primaryText='Github' />
                </ListItem>
                <ListItem onClick={() => window.open('https://github.com/vincenzopalazzo/SpyJSBlock.react')}>
                  <ListItemGraphic graphic={<GoMarkGithub/>} />
                  <ListItemText className='text-white' primaryText='Project' />
                </ListItem>
              </List>

            </IconContext.Provider>

            <div className="fixed-bottom">
              TODO license
            </div>

          </DrawerContent>
        </Drawer>

        <DrawerAppContent className='drawer-app-content'>
          <TopAppBar className="topbar-app-personal">
            <TopAppBarRow>
              <TopAppBarSection align='start'>
                <TopAppBarIcon navIcon tabIndex={0}>
                  <MaterialIcon hasRipple icon='menu' onClick={() => this.openDrawer(true)}/>
                </TopAppBarIcon>
                <TopAppBarTitle>SpyJSBlock.react</TopAppBarTitle>
              </TopAppBarSection>
              <TopAppBarSection align='end' role='toolbar'>
                <TopAppBarIcon actionItem tabIndex={0}>
                  <MaterialIcon
                    icon='stars'
                    onClick={() => window.open('https://vincenzopalazzo.github.io')}
                  />
                </TopAppBarIcon>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust className="container-app">
            <NGraphContainer setState={p => {
              this.setState(p)
            }}/>
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>

    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
