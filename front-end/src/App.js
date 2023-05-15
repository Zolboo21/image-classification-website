import './App.css';
import Main from './comp/Main';
import Result from './comp/Result';
import Sidebar from './comp/Sidebar';

function App() { 
  return (
    <div className="App">
      <div className="conatiner">
        <Sidebar />
        <div className="others">
          <Main />
          <Result />
          </div>
      </div>
      
      
    </div>
  );
}

export default App;
