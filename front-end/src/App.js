import './App.css';
import Main from './comp/Main';
import Sidebar from './comp/Sidebar';
import {StyleSheet, Text, View} from 'react-native';

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
