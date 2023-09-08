import Home from './components/Home';
import AdminHome from './components/AdminHome';
import Register from './components/Registration';
import ViewStatus from './components/ViewStatus';
import Login from './components/Login';
import OwnerTable from './components/OwnerTable';
import Services from './components/Services';
import ServiceBooking from './components/ServiceBooking';
import Edit from './components/Edit';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>
        <Route path='/booking' element={<ServiceBooking/>}/>
        <Route path='/viewstatus' element={<ViewStatus/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/adminpage' element={<OwnerTable/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/edit' element={<Edit/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
