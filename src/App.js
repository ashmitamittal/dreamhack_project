import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import BuyTickets from './pages/BuyTickets'
import Nav from './components/Nav'
import {BrowserRouter, Route} from 'react-router-dom'
import {useEffect} from 'react'
import GameInfo from './pages/GameInfo'
import MyTickets from './pages/MyTickets'

function App() {

  return (
    <div className="App">
        <Nav />
        <BrowserRouter>
            <Route path='/' exact component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/tickets/buy' component={BuyTickets}/>
            <Route path='/game/:name' component={GameInfo}/>
            <Route path='/tournaments' component={MyTickets}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
