import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import HotelList from './Pages/HotelList/HotelList';
import SingleHotel from './Pages/SingleHotel/SingleHotel';
import Login from './Components/Login/Login';

function App() {
  return (
<>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/hotels' element={<HotelList/>}/>
  <Route path='/hotels/:id' element={<SingleHotel/>}/>
  <Route path='/login' element={<Login/>}/>
</Routes>
</BrowserRouter>
</>
  );
}

export default App;
