//SpyJSBlock.react (c) by Vincenzo Palazzo vincenzopalazzodev@gmail.com
//
//SpyJSBlock-Ngraph is licensed under a
//Creative Commons Attribution 4.0 International License.
//
//You should have received a copy of the license along with this
//work. If not, see <http://creativecommons.org/licenses/by/4.0/>
import './../../styles/App.css';
import '@material/react-layout-grid/dist/layout-grid.css';
import '@material/react-button/dist/button.css';

import React from 'react';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import Button from '@material/react-button';

class DialogNodeInformations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    let {title,
      closeDialog,
      id} = this.props;
    return (
      <div>
        <h3 className="title-dialog"> {title} </h3>
        <Grid>
          <Row>
            <Cell columns={12}>Node with id {id}</Cell>
          </Row>
          <Row className="mt-1">
            <Cell columns={5}/>
            <Cell columns={7}>
              <Button
                className="buttons-dialog-default"
                raised={true}
                icon={<i className="material-icons icon-black">close</i>}
                onClick={() => closeDialog()}
              >
                Close
              </Button>
            </Cell>
          </Row>
        </Grid>
      </div>
    );
  }
}
DialogNodeInformations.defaultProps = {};

export default DialogNodeInformations;
