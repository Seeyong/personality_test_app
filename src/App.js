import React, { Component } from 'react';
import Intro from './components/Intro'
import ResultToIntro from './components/ResultToIntro'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

class App extends Component {
constructor(props){
  super(props)
  this.state = {
    test_main_url:'/relationtype/',
  }
}

  render() {
    return(
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={this.state.test_main_url} component={Intro} exact/> {/* go to "Intro" page */}
          <Route path={this.state.test_main_url + 'result/'} component={ResultToIntro} exact/> {/* go to "Result to Start" page */}
          {/* go to "Each Result" page with query string by using for loop */}
        </Switch>
      </Router>
    )
  }
  
}


export default App;

// https://stackoverflow.com/questions/50644602/how-to-share-current-url-in-reactjs