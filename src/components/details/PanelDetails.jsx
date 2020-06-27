//SpyJSBlock.react (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com
//
//SpyJSBlock-Ngraph is licensed under a
//Creative Commons Attribution 4.0 International License.
//
//You should have received a copy of the license along with this
//work. If not, see <http://creativecommons.org/licenses/by/4.0/>
import './../../styles/App.css';
import '@material/react-layout-grid/dist/layout-grid.css';

import React from 'react';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import LouvainDetails from './LouvainDetails';

class PanelDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    let {instanceLouvain} = this.props;
    console.log(instanceLouvain);
    let listClass = [];
    if(instanceLouvain){
      listClass = instanceLouvain.getListClass();
    }
    return (
      instanceLouvain !== undefined &&
      <div className="panel-details">
        <Grid>
          <Row>
            <Cell columns={12}>
              <LouvainDetails
                listClass={listClass}
                setState={p => {this.props.setState(p)}}
                {...this.props}
              />
            </Cell>
          </Row>
        </Grid>
      </div>
    );
  }
}
PanelDetails.defaultProps = {};

export default PanelDetails;
