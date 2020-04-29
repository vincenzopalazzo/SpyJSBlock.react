//SpyJSBlock.react (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com
//
//SpyJSBlock-Ngraph is licensed under a
//Creative Commons Attribution 4.0 International License.
//
//You should have received a copy of the license along with this
//work. If not, see <http://creativecommons.org/licenses/by/4.0/>
import './../../styles/App.css';
import '@material/react-list/dist/list.css';

import React from 'react';
import { ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List, {ListItem, ListItemText} from '@material/react-list';

class LouvainDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titleFirstPanel: 'Class Clustering',
      maxItems: 5
    };

    this.renderSubGraphWithClass = this.renderSubGraphWithClass.bind(this);
  }

  renderSubGraphWithClass(clazz){
    if(!clazz){
      throw Error('Class undefined');
    }
    this.props.setState({
      classSelected: clazz.classNode.toString(),
      isOpenSubGraph: true
    });
  }


  render() {
    let {listClass} = this.props;
    //console.debug(listClass);
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <p>
            {this.state.titleFirstPanel}
          </p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <List style={{maxHeight: '5%', overflow: 'auto'}}>
              {
                listClass.slice(0, this.state.maxItems).map(clazz =>
                  <ListItem key={clazz.classNode}  onClick={() => this.renderSubGraphWithClass(clazz)}>
                    <ListItemText primaryText={clazz.classNode.toString()}/>
                  </ListItem>
                )
              }
            </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

LouvainDetails.defaultProps = {};

export default LouvainDetails;
