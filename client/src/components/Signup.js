import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "../styles/register.css";
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import {TiSocialFacebookCircular} from 'react-icons/ti';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PhoneInput from 'react-phone-number-input'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'react-phone-number-input/style.css'
import Login from '././Login';

const Signup = () => {


    const history = useHistory();

    // let gapi = window.gapi;

    // const onSignIn = (googleUser) => {
    //     // Useful data for your client-side scripts:
    //     console.log("Hi");
    //     var profile = googleUser.getBasicProfile();
    //     console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    //     console.log('Full Name: ' + profile.getName());
    //     console.log('Given Name: ' + profile.getGivenName());
    //     console.log('Family Name: ' + profile.getFamilyName());
    //     console.log("Image URL: " + profile.getImageUrl());
    //     console.log("Email: " + profile.getEmail());

    //     // The ID token you need to pass to your backend:
    //     var id_token = googleUser.getAuthResponse().id_token;
    //     console.log("ID Token: " + id_token);
    //   }




    //   const signOut = () => {
    //     var auth2 = gapi.auth2.getAuthInstance();
    //     auth2.signOut().then(function () {
    //       console.log('User signed out.');
    //     });
    //   }





    // const responseGoogle = (response) => {
    //     var profile = response.getBasicProfile();
    //     console.log(profile.getEmail())
    //     console.log(response);
    //     // history.push('/login');
    //   }

    //   const logout = (response) => {
    //     console.log("Logout");
    //     // history.push('/login');
    //   }

    //   const componentClicked = (response) => {
    //       console.log(response)
    //   }
    //   const responseFacebook = (response) => {
    //       console.log(response)
    //   }







    // const history = useHistory()
    const [fname,setFName] = useState("")
    const [lname,setLName] = useState("")
    const [phone,setPhone] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [country,setCountry] = useState("")
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [username,setUsername] = useState("")
    const [repeatPassword,setRepeatPassword] = useState("")
    const [logo, setLogo] = useState("")
  const [url, setUrlLogo] = useState(undefined)
  useEffect(() => {
    if(url){
      uploadFields()
    }
  }, [url])

  const uploadPic = () => {
    const data = new FormData()
    data.append("file", logo)
    data.append("upload_preset", "VirtuBate")
    data.append("cloud_name", "dpt8wpg3a")
    fetch("https://api.cloudinary.com/v1_1/dpt8wpg3a/image/upload", {
      method: "post",
      body: data
    })
    .then(res=>res.json())
    .then(data=>{
      setUrlLogo(data.url)
    })
    .catch(err => {
      console.log(err)
    })
  }
    const uploadFields = ()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fname,
                lname,
                phone,
                email,
                country,
                state,
                city,
                username,
                password,
                repeatPassword,
                logo:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
               console.log(data.error)
            //   M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               console.log(data.message)
            //    M.toast({html:data.message,classes:"#43a047 green darken-1"})
            //    history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = () => {
        if(logo){
          uploadPic()
        }
        else{
          uploadFields()
        }
      }

















    return (
        <div>
    {/* <meta name="google-signin-client_id" content="798911705185-3jjtf5lks7o28fjsv1u3lp0b2m8rub5h.apps.googleusercontent.com" />
      <GoogleLogin
    clientId="798911705185-3jjtf5lks7o28fjsv1u3lp0b2m8rub5h.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}
  />
  <GoogleLogout
      clientId="98911705185-3jjtf5lks7o28fjsv1u3lp0b2m8rub5h.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>


    <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    text="Login"
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook}
    icon={<TiSocialFacebookCircular />}
  /> */}


            <div class="main">
                <section class="signup">
                    <div class="container">
                        <div class="signup-content">
                            <div class="signup-form">
                                <h2 class="form-title">Sign up</h2>
                                {/* <form method="POST" class="register-form" id="register-form"> */}
                                    <div class="form-group">
                                        <label for="fname"><i class="fas fa-user"></i></label>
                                        <input type="text" name="fname" id="fname" placeholder="First Name" 
                                        value={fname}
                                        onChange={(e) => setFName(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="lname"><i class="fas fa-user"></i></label>
                                        <input type="text" name="lname" id="lname" placeholder="Last Name" 
                                            value={lname}
                                          onChange={(e) => setLName(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                    <Grid item xs={12} md={12} >


            <PhoneInput class="abc"
              //style={{width:250 , innerHeight:100}}
              placeholder="Enter code and ph.no."
              //value={value}
              variant="outlined"
              // autoFocus
              multiline
              required
              value={phone} 
              onChange={(e) => setPhone(e)}
            />

          </Grid>
</div>
                                    <div class="form-group">
                                        <label for="email"><i class="fas fa-envelope"></i></label>
                                        <input type="email" name="email" id="email" placeholder="Your Email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="country"><i class="fas fa-flag"></i></label>
                                        <input type="text" name="country" id="country" placeholder="Country" 
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="state"><i class="fas fa-home"></i></label>
                                        <input type="text" name="state" id="state" placeholder="State" 
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="city"><i class="fas fa-building"></i></label>
                                        <input type="text" name="city" id="city" placeholder="Your City" 
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="username"><i class="fas fa-address-card"></i></label>
                                        <input type="text" name="username" id="username" placeholder="Username" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="pass"><i class="fas fa-lock-open"></i></label>
                                        <input type="password" name="pass" id="pass" placeholder="Password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="re-pass"><i class="fas fa-lock"></i></label>
                                        <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" 
                                        value={repeatPassword}
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                        />
                                    </div>
                                    <Grid xs={12}>
         <div textAlign="left">Update profile picture </div>
          <div class="file-field input-field">
    <div class="btn">
      <input type="file" onChange = {(e) => setLogo(e.target.files[0])}/>
    </div>
    
  </div>
  </Grid>
                                    <div class="form-group">
                                        <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                        <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                                    </div>
                                    <div class="form-group form-button">
                                        <button type="submit" name="signup" id="signup" class="form-submit" value="Register" onClick={() => PostData()}>Register</button>
                                    </div>
                                    <a href="login" class="signup-image-link">I am already member</a>
                                {/* </form> */}
                            </div>
                            <div class="signup-image">
                                <img src="https://res.cloudinary.com/dpt8wpg3a/image/upload/v1598344333/signup-image_ejcp4o.jpg" alt="sign up image" />
                            </div>
                        </div>
                    </div>
                    {/* <div class="g-signin2" 
                    onClick={() => onSignIn}
                    data-theme="dark"></div>

                    <a href="/" onClick={() => signOut}>Sign out</a> */}

                </section>

            </div>

        </div>
    )
}


export default Signup