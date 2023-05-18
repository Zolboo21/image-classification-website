import './App.css';
import Main from './comp/Main';
import Sidebar from './comp/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="conatiner">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
