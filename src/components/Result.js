import React, { Component } from 'react';
import Intro from './Intro'
import quizResults from '../api/quizResults'
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Flower from '../ico-flower.png'
import { Button } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard'

class Result extends Component {
    constructor(props){
        super(props)
        this.state = {
            sample_result_desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
            mode:"result",
            test_main_url:'/relationtype/',
            sharable_url:window.location.href,
        }
        this._onBackToStartButtonClick = this._onBackToStartButtonClick.bind(this)
    }
    _onBackToStartButtonClick(){
        this.setState({
            mode:"intro"
        })
    }
    introPageRender(){
        return(
            <Router>
                <Switch>
                    <Route path={this.state.test_main_url} component={Intro} exact/>
                    <Redirect to={this.state.test_main_url} />
                </Switch>
            </Router>
        )
    }

    resultPageRender(){
        return(
            <div className="result">
                <div className="result-header">
                    <h3 className="result-title">Result!</h3>
                    <p className="result-desc">당신의 성향은</p>
                    <img src={Flower} className="result-image" alt="result_img"/>
                    <div className="result-value">
                        {this.resultRender()}
                    </div>
                </div>
                <div className="share">
                    <h5 className="share-title">공유하기</h5>
                    <div className="share-btn">
                        <CopyToClipboard text={this.state.sharable_url}>
                            <Button 
                                variant="light"
                                onClick={function(){alert("링크가 복사됐어요!")}}>링크</Button>
                        </CopyToClipboard>
                    </div>
                    <div className="re-test-btn">
                        <Button onClick={this._onBackToStartButtonClick} className="retest-btn" variant="light">테스트 다시하기</Button>
                    </div>
                </div>
            </div>
            
        );
    }

    resultRender(){
        // if-else for #1 direct from url(queryString) #2 proper quiz pregress
        // -----------------------------

        var final_result = this.props.answers;
        // calculate max count for final result
        var keys = Object.keys(final_result);
        var max = final_result[keys[0]];
        var i;
        var max_keys = [];
        // below is for & from quizResults component
        var max_result_type = "";
        var max_result_desc = "";

        for (i = 1; i < keys.length; i++) {
            var value = final_result[keys[i]];
            if (value > max) max = value            
        }
        // searching for max count answer types
        for (var key of keys) {
            if(final_result[key] === max){
                max_keys.push(key)
            }
        }
        // searching for max result's type & desc
        for (i = 0; i < quizResults.length; i++){
            if(max_keys[0] === quizResults[i].type){
                max_result_type = quizResults[i].type
                max_result_desc = quizResults[i].desc
            }
        }
        

        // return final result option
        return (
            <div>
                <h3>
                    {max_result_type}
                </h3>
                <p>
                    {max_result_desc}
                </p>
            </div>
                
        )
    }
    render(){
        return(
            <div>
                {this.state.mode === "result" ? this.resultPageRender() : this.introPageRender()}
            </div>
        );
    }
}

export default Result;