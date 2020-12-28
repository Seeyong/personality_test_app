import React, { Component, Fragment } from 'react';
import Intro from './components/Intro'
import ResultToIntro from './components/ResultToIntro'
import TESTS from './api/TESTS'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Result from './components/Result';

class App extends Component {
  constructor(props){
    super(props)
    let i = 0;
    let _all_tests_url = [];
    while (i<TESTS.length) {
      _all_tests_url.push('/'+TESTS[i].info.mainUrl+'/')
      i = i + 1;
    }
    let j = 0;
    let _all_tests_result_url = [];
    while (j<_all_tests_url.length){
      _all_tests_result_url.push(_all_tests_url[j]+'result/')
      j = j + 1;
    }
    let _final_render_routes = [];
    var k = 0;
    
    while(k<TESTS.length){
      var l=  0;
      while(l<TESTS[k].results.length){
        _final_render_routes.push([TESTS[k].results[l].query, TESTS[k].info.mainUrl])
        l = l + 1;
      }
      k = k + 1;
    }
    this.state = {
      result_route:'result/',
      all_tests_url:_all_tests_url,
      all_tests_result_url:_all_tests_result_url,
      final_render_routes:_final_render_routes,
    }
  }

  render() {
    return(
    <Fragment>
      {/* basename="/personality_test_app/" */}
      <Router >
        <Switch>
          <Link to="/zipkok">집콕</Link>
          {/* go to "Intro" page */}
          {this.state.all_tests_url.map((item)=>(
            <Route
              path={item}
              component={() => <Intro test={item.replaceAll('/','')}/>}
              key={item.replaceAll('/','')}
              exact
            />
          ))}
          {/* go to "Result to Start" page */}
          <Route path={this.state.all_tests_result_url} component={ResultToIntro} exact/>
          {/* go to "Each Result contents" page */}
          {this.state.final_render_routes.map((item)=>(
            <Route
              path={'/'+item[1]+'/'+this.state.result_route+item[0]}
              component={Result}
              key={item[1]+'_'+item[0]} />
          ))}
          {/* {quizResults.map((item, index) => (
            <Route
              path={this.state.test_main_url + this.state.result_route + item.query}
              component={() => <Result result={item}/>}
              key={index} exact/>
          ))} */}
        </Switch>
      </Router>
    </Fragment>
    )
  }
  
}


export default App;

// https://stackoverflow.com/questions/50644602/how-to-share-current-url-in-reactjs

