import React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Grid, Paper} from '@material-ui/core';

import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import './App.css';

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container alignItems='center' style={{height: '100%'}}>
        <Grid item xs={12}>
          <Paper elevation={4} style={{margin: 32}}>
            <Grid
              container
              alignItems='center'
              justify='center'
              style={{padding: 32}}>
              <Grid item xs={12} sm={6} style={{textAlign: 'center'}}>
                <img
                  src='https://images.innoveduc.fr/react_odyssey_homer/wildhomer.png'
                  alt='Homer Simpson'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SignIn />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
