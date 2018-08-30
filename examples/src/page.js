/*
 * Fraunhofer Institute for Computer Graphics Research (IGD)
 * Competence Center for Information Visualization and Visual Analytics
 *
 * Copyright (c) 2018 Fraunhofer IGD. All rights reserved.
 *
 * This source code is property of the Fraunhofer IGD and underlies
 * copyright restrictions. It may only be used with explicit
 * permission from the respective owner.
 */

import React, { Component } from 'react';
import {
  FormControl,
  Typography,
  TextField,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';

import MyAwesomeChart from './wrapper-example';


/**
 * Injected styles for this component
 */
const styles = theme => ({
  root: {
    'textAlign': 'center',
    'paddingTop': theme.spacing.unit,
    'margin-left': '1%',
    'width': '98%'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 120,
  },
});

class Index extends Component {
  constructor(props) {
    super(props);

    // Initial component state
    this.state = {
      height: 400,
      width: 300,
      data: ["green"]
    };

  }

  getSizeSettings(){
    return {
      width: this.state.width,
      height: this.state.height,
      minHeight: 100,
      updateHeight: true,
    }
  }

  /**
   * The main render function of this component
   */
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.renderHeader()}
        <div>

        <FormControl className={classes.formControl}>
          <TextField
            id="height"
            label="Height"
            className={classes.textField}
            value={this.state.height}
            onChange={(d) => this.setState({'height': d.target.value})}
            margin="normal"
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id="width"
            label="Width"
            className={classes.textField}
            value={this.state.width}
            onChange={(d) => this.setState({'width': d.target.value})}
            margin="normal"
          />
        </FormControl>

        </div>
        <MyAwesomeChart data={this.state.data} sizeSettings={this.getSizeSettings()} />
      </div>
    );
  }

  /**
   * Renders the page title 
   */
  renderHeader() {
    return (
      <React.Fragment>
        <Typography variant="display1">
          Resize Component Testing Area
        </Typography>
      </React.Fragment>
    )
  }

}

export default withRoot(withStyles(styles)(Index));
