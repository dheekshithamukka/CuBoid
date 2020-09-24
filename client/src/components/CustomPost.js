import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link, useHistory} from 'react-router-dom'
import "../styles/home.css";



const CustomPost  = ()=>{
    const [data,setData] = useState([])
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('/post/${}',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
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

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }


const fetchUsers = (query) => {
    setSearch(query)
    fetch('/search-users',{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query
        })
    }).then(res => res.json())
    .then(results => {
        setUserDetails(results.user)
    })
}




   return (
       <div className="home">
           <button onClick={() => {
               localStorage.clear()
               dispatch({type: "CLEAR"})
               history.push('/login')
           }} >Logout
               </button>
               <input 
           type="text"
            placeholder="title"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
            <i className="fas fa-search"></i>
            <ul>
                {userDetails.map(item => {
                    return <Link to={item._id != state._id ? "/profile/"+item._id : "/profile"}><li>{item.username}</li></Link>
                })}
            </ul>
           {
               data.map(item => {
                   return(
                    <div className="card home-card" key={item._id}>
                        <h1><Link to={item.postedBy._id != state._id ? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.username}</Link>
                        {item.postedBy._id == state._id && 
                        <i class="fas fa-trash-alt" style={{float: "right"}} onClick={() => deletePost(item._id)}></i>
                        }
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
