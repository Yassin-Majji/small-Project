
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import NewProduct from './NewProduct';
import Home from './Home';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/createProduct' element={<NewProduct/>}/>
     </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
