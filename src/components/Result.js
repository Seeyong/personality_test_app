import React, { Component, Fragment } from 'react';
import Intro from './Intro'
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Logo from '../k_test_logo.png'
import { Button, Card } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard'

class Result extends Component {
    constructor(props){
        super(props)
        this.state = {
            mode:"result",
            test_main_url:'/zipkok/',
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
                <img src={Logo} className="result-image" alt="result_img"/>
                    <h5 className="result-title">당신의 성향은</h5>
                    <div className="result-value">
                        {this.resultRender()}
                    </div>
                </div>
                <div className="share">
                    <h5 className="share-title">친구에게 공유하기</h5>
                    <div className="share-btn">
                        <CopyToClipboard text={this.state.sharable_url+"result/"+this.props.result.query}>
                            <Button 
                                variant="dark"
                                onClick={function(){alert("링크가 복사됐어요!")}}>링크 복사</Button>
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
                <Card className="result-card" bg="light">
                    <Card.Header className="result-header">
                        {final_score_type}
                    </Card.Header>
                    <Card.Body className="result-p">
                        <Card.Text>{final_score_desc}</Card.Text>
                    </Card.Body>
                </Card>
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