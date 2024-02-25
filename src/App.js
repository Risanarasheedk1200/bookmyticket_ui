import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Modal from 'react-modal';

// Set the application element
Modal.setAppElement('#root');
function App() {
  return (
    <div className="App">
       <div>
   <BrowserRouter basename='/'>
   <AppRoutes/>
   </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
