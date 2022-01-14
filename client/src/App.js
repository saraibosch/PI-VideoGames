import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import VideogameCreated from './components/VideogameCreated/VideogameCreated';
import Detail from './components/Detail/Detail';
import ErrorGame from './components/ErrorGame/ErrorGame';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component= {Home} />
          <Route exact path='/videogame' component= {VideogameCreated} />
          <Route exact path='/videogame/:id' component= {Detail} />
          <Route exact path='/error' component= {ErrorGame} />

        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
