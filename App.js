import firebase from 'firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from "./Component/Navbar";
import Dashboard from "./Component/Pages/Dashboard";
import Home from "./Component/Pages/Home";
import Report from "./Component/Pages/Report";
import Security from "./Component/Pages/Security";
import SignIn from './features/Auth/SignIn';
import {useEffect} from 'react';



// Configure Firebase.
const config = {
  apiKey: 'AIzaSyBtVLQVUIYVT7fOdUO1t3EFjSIVqecaXb8',// in gg fire base setting
  authDomain: 'lvtn-b8474.firebaseapp.com', // in gg firebase
  // ...
};
firebase.initializeApp(config);

function App() {
  // Handle fire base auth changed
  useEffect(() =>{
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async(user)=>{
    if (!user) {
      // user log out ,handle something here
      console.log('User is not logged in');
      return;
    }
    console.log('Logged in user: ' ,user.displayName);
    const token =await user.getIdToken();
    console.log('Logged in user token : ', token);
  });
  return () => unregisterAuthObserver();
  },
  []);
 
  return (
    <Router>
      <Navbar/>
      <Switch>
        
        <Route path ='/' exact component ={Home} />
        <Route path ='/dashboard' component ={Dashboard} />
        
        <Route path ='/security' exact component ={Security} />
        <Route path ='/login' exact component ={SignIn} />
        <Route path ='/report' exact component ={Report} />

      </Switch>
    </Router>
  );
}

export default App;
