import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/auth/signUp';
import Home from './components/home';
import Login from './pages/auth/login';
import Sidebar from './components/sideBar';
import RightPanel from './components/rightPanel';
import Notification from './components/notification';
import Profile from './components/Profie.jsx';

function App() {

  const authUser = true;

  return (
    <div className='flex max-w-6xl mx-auto'>
      <Sidebar/>
<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to='/' />} />
				<Route path='/login' element={!authUser ? <Login /> : <Navigate to='/login' />} />
				<Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to='/signup' />} />
				<Route path='/notifications' element={authUser ? <Notification /> : <Navigate to='/' />} />
				<Route path='/profile/:username' element={authUser ? <Profile /> : <Navigate to='/' />} />
			</Routes>
      <RightPanel/>
    </div>
  )
}

export default App
