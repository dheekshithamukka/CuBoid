import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../App'
import {useParams} from 'react-router-dom';
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
  

const UserProfile  = ()=>{
    const classes = useStyles();
    const {userid} = useParams();
    console.log(userid)
    const [userProfile,setProfile] = useState(null)
    const [details,setDetails] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [interests,setInterests] = useState("")
    const [open_modal_dropdown,setopen_modal_dropdown]=useState(false);
    const [url, setUrl] = useState("")
    const [maxWidth, setMaxWidth] = React.useState('lg');

    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setProfile(result)
       })
    },[])

    // useEffect(()=>{
    //    fetch('/mydetails',{
    //        headers:{
    //            "Authorization":"Bearer "+localStorage.getItem("jwt")
    //        }
    //    }).then(res=>res.json())
    //    .then(result=>{
    //        console.log(result[0])
    //        setDetails(result[0])
    //    })
    // },[])
    

    const addFriend = (name) => {
      console.log(name);
      var receiverName;
      fetch('/search', {
        method:"post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          receiverName: name
      })
      }).then(res => res.json)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err)
      })
    }




   return (
       <>
       {userProfile ? 
       
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
        <h4>{userProfile.user.fname} {userProfile.user.lname}</h4>
        <h5>{userProfile.user.email}</h5>
        <h5>{userProfile.user.username}</h5>
        
        <input type="hidden"  id="currentuser" value="{{state.username}}"></input>
        <input type="hidden" name="receiverName" class="receiverName" value="{{userProfile.user.username}}" />
<input type="hidden" name="sender-name" class="sender-name" value="{{state.username}}" />
<button type="submit" id=""
onClick = {() => addFriend(userProfile.user.username)}
class="btn add accept friend-add"><i class="fa fa-user"></i> Add Friend</button>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userProfile.posts.length} posts</h6>
                       {/* <h6>{state?state.followers.length:"0"} followers</h6> */}
                       {/* <h6>{state?state.following.length:"0"} following</h6> */}
                   </div>

               </div>
           </div>
        
            </div>      
            

    <div>
      Name: {userProfile.user.fname} {userProfile.user.lname}
      <br />
      Phone: {userProfile.user.phone}
      <br />
      Email: {userProfile.user.email}
      <br />
      City: {userProfile.user.city}
      <br />
      State: {userProfile.user.state}
      <br />
      Country: {userProfile.user.country}
      <br />
      Interests: {userProfile.user.interests}
    </div>

           <div className="gallery">
               {
                   userProfile.posts.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }


           </div>
       </div>
       
       : <h2>Loading...</h2> }
       
       </>
   )
}

export default UserProfile
