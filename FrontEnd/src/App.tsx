import { RecoilRoot } from 'recoil'
import './App.css'
import { Dashboard } from './pages/dashbord'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Share } from './pages/Share'


function App() {



  return<div>
    <RecoilRoot>
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share/:shareLink" element={<Share />} />
      </Routes>
    </BrowserRouter>
    </RecoilRoot>


  </div>
}

export default App
