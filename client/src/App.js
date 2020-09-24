import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import UserProfile from './components/UserProfile'
import CreatePost from './components/CreatePost'
import Reset from './components/Reset'
import NewPassword from './components/NewPassword'
import Forum from './components/Forum'


import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()


const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(history.location.pathname.startsWith('/signup')){
           history.push('/signup')
      }
      // else if(history.location.pathname.startsWith('/reset/')){
      //      history.push('/reset')
      // }
      // else if(history.location.pathname.startsWith('/reset')){
      //      history.push('/reset')
      // }
      else if(!history.location.pathname.startsWith('/reset'))
           history.push('/login')
    }
  }, [])
  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route exact path="/profile" >
      <Profile />
      </Route>
      <Route path="/profile/:userid">
      <UserProfile />
      </Route>
      <Route path="/createpost" >
      <CreatePost />
      </Route>
      <Route path="/signup" >
      <Signup />
      </Route>
      <Route path="/login" >
      <Login />
      </Route>
      <Route exact path="/reset" >
      <Reset />
      </Route>
      <Route path="/reset/:token" >
      <NewPassword />
      </Route>
      <Route path="/forum" >
      <Reset />
      </Route>
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
