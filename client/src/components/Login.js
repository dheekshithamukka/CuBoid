// import React, { useState, useEffect } from 'react'
// import { Link, useHistory } from 'react-router-dom'
// import "../styles/register.css";
// const Login = () => {
//     // const history = useHistory()
//     // const [name,setName] = useState("")
//     // const [password,setPasword] = useState("")
//     // const [email,setEmail] = useState("")
//     // const [image,setImage] = useState("")
//     // const [url,setUrl] = useState(undefined)
//     // useEffect(()=>{
//     //     if(url){
//     //         uploadFields()
//     //     }
//     // },[url])
//     // const uploadPic = ()=>{
//     //     const data = new FormData()
//     //     data.append("file",image)
//     //     data.append("upload_preset","new-insta")
//     //     data.append("cloud_name","cnq")
//     //     fetch("https://api.cloudinary.com/v1_1/cnq/image/upload",{
//     //         method:"post",
//     //         body:data
//     //     })
//     //     .then(res=>res.json())
//     //     .then(data=>{
//     //        setUrl(data.url)
//     //     })
//     //     .catch(err=>{
//     //         console.log(err)
//     //     })
//     // }
//     // const uploadFields = ()=>{
//     //     if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
//     //         M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
//     //         return
//     //     }
//     //     fetch("/signup",{
//     //         method:"post",
//     //         headers:{
//     //             "Content-Type":"application/json"
//     //         },
//     //         body:JSON.stringify({
//     //             name,
//     //             password,
//     //             email,
//     //             pic:url
//     //         })
//     //     }).then(res=>res.json())
//     //     .then(data=>{
//     //        if(data.error){
//     //           M.toast({html: data.error,classes:"#c62828 red darken-3"})
//     //        }
//     //        else{
//     //            M.toast({html:data.message,classes:"#43a047 green darken-1"})
//     //            history.push('/signin')
//     //        }
//     //     }).catch(err=>{
//     //         console.log(err)
//     //     })
//     // }
//     // const PostData = ()=>{
//     //     if(image){
//     //         uploadPic()
//     //     }else{
//     //         uploadFields()
//     //     }

//     // }



//     const responseGoogle = (response) => {
//         var profile = response.getBasicProfile();
//         console.log(profile.getEmail())
//         console.log(response);
//         history.push('/login');
//       }

//       const logout = (response) => {
//         console.log("Logout");
//       }













//     return (
//         <div>
//             <div class="main">

//                 <section class="sign-in">
//                     <div class="container">
//                         <div class="signin-content">
//                             <div class="signin-image">
//                                 <img src="https://res.cloudinary.com/dpt8wpg3a/image/upload/v1598344333/signin-image_mgoqvm.jpg" alt="sign in image" />
//                                 {/* <a href="register" class="signup-image-link">Create an account</a>  */}
//                             </div>

//                             <div class="signin-form">
//                                 <h2 class="form-title">Sign in</h2>
//                                 {/* <form method="POST" class="register-form" id="login-form"> */}
//                                     <div class="form-group">
//                                         <label for="your_name"><i class="fas fa-user"></i></label>
//                                         <input type="text" name="your_name" id="your_name" placeholder="Your Name" />
//                                     </div>
//                                     <div class="form-group">
//                                         <label for="your_pass"><i class="fas fa-lock"></i></label>
//                                         <input type="password" name="your_pass" id="your_pass" placeholder="Password" />
//                                     </div>
//                                     <div class="form-group">
//                                         <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
//                                         <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
//                                     </div>
//                                     <div class="form-group form-button">
//                                         <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" />
//                                     </div>
//                                     <a href="/" class="signup-image-link">Create an account</a>

//                                 {/* </form> */}
//                                 <div class="social-login">
//                                     <span class="social-label">Or login with</span>
//                                     <ul class="socials">
//                                         <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
//                                         <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
//                                         <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//             </div>
//         </div>
//     )
// }


// export default Login










import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
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



export default function Login() {
  const classes = useStyles();
  const {state,dispatch} = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const PostData = () => {
    // if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    //   M.toast({ html: "Invalid email or password", classes: "#c62828 red darken-3" })
    //   return
    // }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        email,
        password
      })

    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
          // M.toast({ html: data.error, classes: "#c62828 red darken-3" })
        }
        else {
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          console.log("He")
         // M.toast({ html: "Signed in successfully", classes: "#c62828 green darken-3" })
          dispatch({type: "USER", payload: data.user})
          history.push('/');
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
        <img src="https://res.cloudinary.com/dpt8wpg3a/image/upload/v1598344333/signin-image_mgoqvm.jpg" alt="sign in image" >
                    </img>
        </div>
            </Grid>
            <Grid container lg={6} md={6} sm={12} xs={12} direction="column" justify="center" alignItems="center" style={{paddingTop:"20px",paddingBottom:"20px"}}>
                <Typography component="h1" variant="h5" >
        <Box fontWeight="fontWeightBold" textAlign="center" m={1}>
        Login
      </Box>
          
        </Typography>

          <TextField
            style={{width:285}}
            margin="normal"
            required
            variant="outlined"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
                focused: classes.focused
              }
            }}
            InputProps={{
              disableUnderline:true,
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

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

          
        {/* <br /> */}
          <FormControlLabel 
          class = "form-group"
          // style={{width:285}}
          
            control={<Checkbox value="remember" color="primary"  />}
            label="Remember me"            
          />
          <ColorButton
            type="submit"
            // style={{width:100,borderRadius:30}}
            // variant="contained"
            
            // color="blue"
            onClick={() => PostData()}
            className={classes.submit}

          >
            Login
          </ColorButton>
           <Grid container justify="flex-start">
            <Grid item xs={12} justify="flex-start">
              <Link href="/reset" variant="body2" align="left" style={{padding: "10px"}}>
                Forgot Password?
               
              </Link>
           
              <Link href="/signup" justify="flex-end" variant="body2" align="right" style={{padding: "10px"}}>
                {"Register Now"}
              </Link>
            </Grid>
          </Grid>  
            </Grid>
            </Grid>
        </div>
        </Grid>
      </Grid>
     </div>
    
  );
}


