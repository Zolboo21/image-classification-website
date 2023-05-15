import './App.css';
import Main from './comp/Main';
import Result from './comp/Result';
import Sidebar from './comp/Sidebar';

function App() { 
  return (
    <div className="App">
      <Main />
      <Sidebar width={320}>
        <Contact />
      </Sidebar>
      <Result />
    </div>
  );
}

export default App;
