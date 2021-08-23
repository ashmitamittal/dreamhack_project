import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import BuyTickets from './pages/BuyTickets'
import Navi from './components/Nav'
import {BrowserRouter, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'
import GameInfo from './pages/GameInfo'
import MyTickets from './pages/MyTickets'
import AdminHome from './pages/AdminHome'
import AdminUsers from './pages/admin/AdminUsers'
import AdminGames from './pages/admin/AdminGames'
import AdminTokens from './pages/admin/AdminTokens'
import AdminEntries from './pages/admin/AdminEntries'

function App() {
  return (
    <div className="App">
        <Navi />
        <BrowserRouter>
            <Route path='/' exact component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/admin' component={AdminHome}/>
            <Route path='/admin/tokens' component={AdminTokens}/>
            <Route path='/admin/entries' component={AdminEntries}/>
            <Route path='/admin/users' component={AdminUsers}/>
            <Route path='/admin/games' component={AdminGames}/>
            <Route path='/register' component={Register}/>
            <Route path='/logout' component={Logout} />
            <Route path='/profile' component={Profile}/>
            <Route path='/tickets/buy' component={BuyTickets}/>
            <Route path='/game/:name' component={GameInfo}/>
            <Route path='/tournaments' component={MyTickets}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
