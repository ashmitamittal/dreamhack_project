import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Home from './pages/Home'
import Nav from './components/Nav'
import {BrowserRouter, Route} from 'react-router-dom'
import {useEffect} from 'react'

function App() {
//
//        useEffect(() => {
//       (
//            async () => {
//
//            }
//       )()
//
//    })
  return (
    <div className="App">
        <Nav />
        <BrowserRouter>
            <Route path='/' exact component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/profile' component={Profile}/>
        </BrowserRouter>
    </div>
  );
}

export default App;