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
    result_route:'result/',
  }
}

  render() {
    return(
      <Router basename="/personality_test_app/">
        <Switch>
          <Route path={this.state.test_main_url} component={Intro} exact/> {/* go to "Intro" page */}
          <Route path={this.state.test_main_url + this.state.result_route} component={ResultToIntro} exact/> {/* go to "Result to Start" page */}
          {/* go to "Each Result" page */}
          {quizResults.map((item, index) => (
            <Route
              path={this.state.test_main_url + this.state.result_route + item.query}
              component={() => <Result result={item}/>}
              key={index} exact/>
          ))}
        </Switch>
      </Router>
    )
  }
  
}


export default App;

// https://stackoverflow.com/questions/50644602/how-to-share-current-url-in-reactjs