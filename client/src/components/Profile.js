import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../App'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link, Grid, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles((theme) => ({
    main_div: {
      position: 'absolute'
      // position: 'relative',
    },  
    root: {
      maxWidth: 350,
      maxHeight: 350,
      borderTopLeftRadius:0,
      borderRadius: 30.0,
      borderColor : 'orange',
       boxShadow: '0 3px 5px 2px gray',
      '&:hover':{
        backgroundImage: 'linear-gradient(220deg,#FFC312, #EE5A24, #ffffff )',
      }
    },
    media: {
      width: theme.spacing(7),
      height: theme.spacing(7),
  
      },
    gridList: {
      // blockSize : 
      // width:500,
      // height : 450,
      display: "flex",
      // overflow : "visible",
      justifyContent: 'space-around',
      borderSpacing: 10,
      borderTopLeftRadius:0,
    },
    popup_card: {
      // width: 1000,
      // height: 1000,
    },
    dialog_box: {
      // width: 1000,
      // height: 1000,
    },
    card: {
      maxWidth: 350 ,
      maxHeight: 350,
      borderTopLeftRadius:0,
       borderRadius: 30.0,
      // maxWidth: 345,
      // top: '50%',
      // left: '50%',
      // borderRadius: 10,
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      // backgroundSize: '200%',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      transition: '0.6s',
      backgroundImage: 'linear-gradient(45deg, #FFC312, #EE5A24, #00a8ff)',
      '&:hover': {
        backgroundPosition: 'right'
      }
    },
    card_button:{
      '&$onClick': {
        backgroundColor : 'white',
        color: 'white',
      },
    }
  
  }));
const styles2 = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
const DialogTitle = withStyles(styles2)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  

const Profile  = ()=>{
    const classes = useStyles();
    const [mypics,setPics] = useState([])
    const [requests,setRequests] = useState([])
    const [friends,setFriends] = useState([])
    const [details,setDetails] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [interests,setInterests] = useState("")
    const [open_modal_dropdown,setopen_modal_dropdown]=useState(false);
    const [url, setUrl] = useState("")
    const [maxWidth, setMaxWidth] = React.useState('lg');
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       fetch('/handle-requests',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setRequests(result)
       })
    },[])
    useEffect(()=>{
       fetch('/friendslist',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setFriends(result)
       })
    },[])
    useEffect(()=>{
       fetch('/mydetails',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result[0])
           setDetails(result[0])
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file", image)
    data.append("upload_preset", "VirtuBate")
    data.append("cloud_name", "dpt8wpg3a")
        fetch("https://api.cloudinary.com/v1_1/dpt8wpg3a/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
       console.log(data)
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   logo:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,logo:result.logo}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }


    const editProfile = () => {
        handlemodal_close_dropdown()
        fetch(`/edit-profile`,{
          method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              interests
          })
      }).then(res=>res.json())
      .then(data=>{
          console.log(data)
         if(data.error){
           console.log(data.error)
            // M.toast({html: data.error,classes:"#c62828 red darken-3"})
         }
         else{
            console.log("Posted successfully")
            //  M.toast({html:data.message,classes:"#43a047 green darken-1"})
            //  history.push('/signin')
         }
      }).catch(err=>{
          console.log(err)
      })
    }



    const accept_friend = (senderId, senderName) => {
      console.log(senderId)
      console.log(senderName)
      fetch('/search', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          senderId:senderId,
          senderName: senderName
      })
      }).then(res => res.json)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })
    }

    const cancel_friend = (user_Id) => {
      console.log(user_Id)
      fetch('/search', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          user_Id: user_Id
      })
      }).then(res => res.json)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })
    }




    function handle_modal_dropdown(){
        setopen_modal_dropdown(true);
       
      };

      const handlemodal_close_dropdown=() => {
        setopen_modal_dropdown(false);
    };

   return (
       <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={state?state.logo:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{state?state.fname:"loading"}</h4>
                   <h4>{state?state.username:"loading"}</h4>
          
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       {/* <h6>{state?state.followers.length:"0"} followers</h6> */}
                       {/* <h6>{state?state.following.length:"0"} following</h6> */}
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            {/* <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>updatePhoto()}
            >
                Update
            </button> */}
            </div>
            <button onClick={handle_modal_dropdown}>Edit profile</button>
            </div>      

            <Dialog
   className={classes.dialog_box_dropdown}
   open={open_modal_dropdown}
   aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    
      maxWidth={maxWidth}
  >

    <DialogContent dividers>
        <Grid>
            <h4>Hello</h4>
            <div class="form-group">
                                        <label for="interests"></label>
                                        <input type="text" name="interests" id="interests" placeholder="Interests" 
                                            value={interests}
                                          onChange={(e) => setInterests(e.target.value)}
                                        />
                                    </div>
            <button onClick={() => editProfile()}>Edit profile</button>
        </Grid>
    </DialogContent>
    </Dialog>
    <div>
      Name: {details.fname} {details.lname}
      <br />
      Phone: {details.phone}
      <br />
      Email: {details.email}
      <br />
      City: {details.city}
      <br />
      State: {details.state}
      <br />
      Country: {details.country}
      <br />
      Interests: {details.interests}
    </div>

    <div className="requests">
               {
                   requests.map(item=>{
                    return(
                      <div>
                      <Link to={item._id != state._id ? "/profile/"+item._id : "/profile"}><li>{item.username}</li></Link>
                      <input type="hidden" name="senderId" id="senderId" value="{{item.userId}}" />
                      <input type="hidden" name="senderName" id="enderName" value="{{item.username}}" />
                      <button type="submit" id="accept_friend" class="btn btn-primary" onClick={() => accept_friend(item.userId, item.username)}>Accept</button>
                      
                      <input type="hidden" name="user_Id" id="user_Id" value="{{item.userId}}" />
                      <button type="submit" id="cancel_friend" class="btn btn-primary" onClick={() => cancel_friend(item.userId)}>Cancel</button>
                      
                      </div>
                   )
                  })
               }

           
           </div>




           <div className="friendslist">
             <h1>Friends</h1>
               {
                   friends.map(item=>{
                       return(
                        <div>
                          {item.friendName}
                        </div>
                      )
                   })
               }

           
           </div>
           <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }

           
           </div>
       </div>
   )
}

export default Profile
