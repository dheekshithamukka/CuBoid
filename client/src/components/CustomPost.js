import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link, useHistory} from 'react-router-dom'
import {useParams} from 'react-router-dom';
import "../styles/home.css";



const CustomPost  = ()=>{
    const [data,setData] = useState([])
    const [post,setPost] = useState([])
    const {postId} = useParams();
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
            fetch(`/post/${postId}`,{
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
            }).then(res => res.json())
            .then(results => {
                console.log(results.post)
                setPost(results.post)
            })
     },[])

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            // console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    



   return (
    <div className="home">
    {
        post.map(item => {
            return(
             <div className="card home-card" key={item._id}>
                 <h1><Link to={item.postedBy._id != state._id ? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.username}</Link>
                 
                 </h1>
                 
                 <div className="card-image">
                     {/* <img src={item.photo} /> */}
                     <iframe width="500" height="400" src={item.photo} frameborder="0"></iframe>
                 </div>

                 <div className="card-content">
                 <i className="fas fa-heart" style={{color: "red"}}></i>
                     {item.likes.includes(state._id)
                         ? 
                         <i className="fas fa-thumbs-down" onClick={() => {unlikePost(item._id)}}></i>
                         :   
                         <i className="fas fa-thumbs-up" onClick={() => {likePost(item._id)}}></i>
                     }
                 
                     <h3>{item.likes.length} likes</h3>
                     <h1>{item.title}</h1>
                     <p>{item.body}</p>
                     {
                         item.comments.map(record => {
                             return(
                             <h6 key={record._id}><span style={{fontWeight: "500"}}>{record.postedBy.username}</span> {record.text} </h6>
                             )
                         })
                     }
                     <form onSubmit={(e) => {
                         e.preventDefault()
                         makeComment(e.target[0].value, item._id)
                     }}>
                     <input type="text" placeholder="Add a comment" />
                     </form>
                 </div>
             </div>
            )
        })
    }
    </div>
   )
}


export default CustomPost
