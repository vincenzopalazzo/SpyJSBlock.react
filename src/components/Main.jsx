//SpyJSBlock.react (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com
//
//SpyJSBlock-Ngraph is licensed under a
//Creative Commons Attribution 4.0 International License.
//
//You should have received a copy of the license along with this
//work. If not, see <http://creativecommons.org/licenses/by/4.0/>
//SpyJSBlock.react (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com
//
//SpyJSBlock-Ngraph is licensed under a
//Creative Commons Attribution 4.0 International License.
//
//You should have received a copy of the license along with this
//work. If not, see <http://creativecommons.org/licenses/by/4.0/>

import './../styles/App.css';

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

import React, {Component, useState} from 'react';

import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {DrawerAppContent, DrawerContent, DrawerTitle} from '@material/react-drawer';
import IconButton from '@material/react-icon-button';
import { IconContext } from "react-icons";
import {GoMarkGithub} from 'react-icons/go'
import List, {ListItem, ListItemText, ListItemGraphic} from '@material/react-list';

import NGraphContainer from './ngraph/NGraphContainer';

/**
 * @author https://vincenzopalazzo.github.io/
 */
class AppComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false
    };

    this.setStateDrawer = this.setStateDrawer.bind(this);
  }

  setStateDrawer(newState){
    this.setState({
      drawerOpen: newState
    });
  }

  render() {
    return (
      <React.Fragment>
       <Drawer
          modal
          dismissible={true}
          open={this.state.drawerOpen}
          className="content-drawer"
        >
          <IconButton className="drawer-icon-button-personal"
                      onClick={() => this.setStateDrawer(false)}>
            <MaterialIcon icon='close'/>
          </IconButton>
          <DrawerTitle tag="h2" className="drawer-title">
            <div>
              <img src="https://avatars2.githubusercontent.com/u/17150045?s=460&v=4" className="author"/>
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
                  <ListItemText className='text-white' primaryText='SpyJSBlock.react' />
                </ListItem>
                <ListItem onClick={() => window.open('https://vincenzopalazzo.github.io/SpyJSBlock/')}>
                  <ListItemGraphic graphic={<GoMarkGithub/>} />
                  <ListItemText className='text-white' primaryText='SpyJSBlock' />
                </ListItem>
                <ListItem onClick={() => window.open('https://vincenzopalazzo.github.io/SpyJSBlock-NGraph/')}>
                  <ListItemGraphic graphic={<GoMarkGithub/>} />
                  <ListItemText className='text-white' primaryText='SpyJSBlock-NGraph' />
                </ListItem>
              </List>
            </IconContext.Provider>

            <div className="fixed-bottom license-personal">
              <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                <img src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
              </a>
            </div>
          </DrawerContent>
        </Drawer>

        <DrawerAppContent>
          <TopAppBar className="topbar-app-personal">
            <TopAppBarRow>
              <TopAppBarSection align='start'>
                <TopAppBarIcon navIcon tabIndex={0}>
                  <MaterialIcon hasRipple icon='menu' onClick={() => this.setStateDrawer(true)}/>
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
        </DrawerAppContent>
        <NGraphContainer setState={p => {
          this.setState(p)
        }}/>
      </React.Fragment>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
