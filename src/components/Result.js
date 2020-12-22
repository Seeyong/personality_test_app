import React, { Component, Fragment } from 'react';
import Intro from './Intro'
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
            <Router basename="/personality_test_app">
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
                        <CopyToClipboard text={this.state.sharable_url+"result/"+this.props.result.query}>
                            <Button 
                                variant="dark"
                                onClick={function(){alert("링크가 복사됐어요!")}}>링크</Button>
                        </CopyToClipboard>
                    </div>
                    <div className="re-test-btn">
                        <Button onClick={this._onBackToStartButtonClick} className="retest-btn" variant="dark">테스트 다시하기</Button>
                    </div>
                </div>
            </div>
            
        );
    }

    resultRender(){
        let final_score_type = this.props.result.type
        let final_score_desc = this.props.result.desc

        // return final result option
        return (
            <Fragment>
                <h3 className="result-header">
                    {final_score_type}
                </h3>
                <p className="result-p">
                    {final_score_desc}
                </p>
            </Fragment>
                
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