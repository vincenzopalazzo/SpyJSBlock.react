import DialogSubGraph from 'components/dialogs/DialogSubGraph';

require('normalize.css/normalize.css');
require('styles/App.css');

import '@material/react-layout-grid/dist/layout-grid.css';

import React from 'react';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import LouvainDetails from 'components/details/LouvainDetails';

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
