import React, {useState, useContext} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../styles/login.css';
import { withStyles } from "@material-ui/core/styles";
import { yellow,purple } from '@material-ui/core/colors';
import Spacer from 'react-add-space';
import Paper from '@material-ui/core/Paper';
import {UserContext} from '../App'





const ColorButton = withStyles((theme) => ({
  root: {
    // color: theme.palette.getContrastText(purple[500]),
    backgroundColor:"#A0AFF0",  
    // '&:hover': {
    //   backgroundColor: purple[700],
    // },
    
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    //background: Background,
    backgroundRepeat: 'no-repeat',
    // backgroundColor:'red',
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  // root: {
  //   height: '100vh',
    
  // },
 
  form_grid:{
    // backgroundColor: '#F08080',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display : 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background : 'white',
    // backgroundColor:'red',
    borderRadius : 20,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    // backgroundColor:'red',
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },

  login_container: {    
    backgroundColor:"#A0AFF0",   
    
    height:"100%",
    height: "100vh",
  }
}));

function onclickedSubmitFunction(e){
//   e.color="#BF1920";
}



export default function NewPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [password, setPassword] = useState("")
  const {token} = useParams();

  const PostData = () => {
    // if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    //   M.toast({ html: "Invalid email or password", classes: "#c62828 red darken-3" })
    //   return
    // }
    fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token
      })

    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          console.log(data.message)
          history.push('/login');
        }
      }).catch(err => {
        console.log(err)
      })
  }



  return (

  
  <div className={classes.login_container}>
    <Grid container className={clsx(classes.root,"image_grid")} justify="center" alignItems="center">
      <CssBaseline/>
      {/* <Grid item xs={12} sm={4} md={6} lg={8} /> */}
      {/* <Grid item xs={8} sm={7} md={3} component={Paper} elevation={6} className={classes.form_grid}> */}
      <Grid  xs={12} sm={8} md={9} lg={7} >
        <div className={classes.paper}>
            <Grid container>
            <Grid container lg={6} md={6} sm={12} xs={12} justify="center" alignItens="center" style={{padding:"20px"}}>
            <div className="xs_archlogo">
        </div>
            </Grid>
            <Grid container lg={6} md={6} sm={12} xs={12} direction="column" justify="center" alignItems="center" style={{paddingTop:"20px",paddingBottom:"20px"}}>
                <Typography component="h1" variant="h5" >
          
        </Typography>

          <TextField
          style={{width:285}}
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          fullWidth
          required
          color="primary"
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
              focused: classes.focused
            }
          }}
          InputProps={{
            disableUnderline:true,
          }}
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <ColorButton
            type="submit"

            onClick={() => PostData()}
            className={classes.submit}

          >
            Update Password
          </ColorButton>
            
            </Grid>
            </Grid>
        </div>
        </Grid>
      </Grid>
     </div>
    
  );
}


