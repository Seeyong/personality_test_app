import React, { Component } from 'react';
import Intro from './components/Intro'
import ResultToIntro from './components/ResultToIntro'
import quizResults from './api/quizResults'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Result from './components/Result';

class App extends Component {
constructor(props){
  super(props)
  this.state = {
    test_main_url:'/relationtype/',
  }
}

  render() {
    return(
      <Router basename="/personality_test_app/">
        <Switch>
          <Route path={this.state.test_main_url} component={Intro} exact/> {/* go to "Intro" page */}
          <Route path={this.state.test_main_url + 'result/'} component={ResultToIntro} exact/> {/* go to "Result to Start" page */}
          {/* go to "Each Result" page with query string by using for loop */}
          {quizResults.map((item) => (
            <Route path={this.state.test_main_url + 'result/' + item.query} component={() => <Result result={item}/>} exact/>
          ))}
        </Switch>
      </Router>
    )
  }
  
}


export default App;

// https://stackoverflow.com/questions/50644602/how-to-share-current-url-in-reactjs