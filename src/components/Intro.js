import React, { Component } from 'react';
import Quiz from './Quiz'
import Result from './Result'
import Loading from './Loading'
import quizQuestions from '../api/quizQuestions'
import Flower from '../ico-flower.png'
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Intro extends Component {
    constructor(props){
        super(props)
        // create answer option object for counting each question's answer
        var answer_obj = {};
        var i = 0;
        for(i=0;i<quizQuestions[0].answers.length;i++) {
        answer_obj[quizQuestions[0].answers[i].type] = 0;
        };
        this.state = {
            mode:'intro',
            qAndA:quizQuestions,
            quizNumber:0,
            answers:answer_obj,
            result_url:'result',
            quiz_url:"/personality_test_app/relationtype/",
        }
        this._onStartButtonClick = this._onStartButtonClick.bind(this);
    }
    _onStartButtonClick(){
        this.setState({
            mode:'quiz'
        })
    }

    introPageRender(){
        return (
            <div className="intro container">
                <img src={Flower} alt="rea"/>
                <h1 className='title'>취향 분석 테스트</h1>
                <div>    
                    <h5 className='sub-title'>코로나 집콕 테스트</h5>
                    <div className="start-btn-div">
                        <Button
                            onClick={this._onStartButtonClick}
                            variant="light"
                            size="lg"
                            className="start-btn"
                            bsPrefix="btn"
                        >시작하기</Button>
                    </div>
                </div>
            </div>
        );
    }

    quizPageRender(){
        if(this.state.mode === "quiz"){
            let _page = <Quiz
            qAndA={this.state.qAndA}
            quizNum={this.state.quizNumber}
            onChangeMode={
                function(_quizNum, _answer, _mode) {
                var _answers = Object.assign({}, this.state.answers);
                _answers[_answer] = _answers[_answer] + 1;
                this.setState({
                    quizNumber:_quizNum,
                    answers:_answers,
                    mode:_mode
                })
            }.bind(this)}></Quiz>
            return _page
        } else if(this.state.mode === "loading"){
            return(
                <div className="loading-upper">
                    <Loading />
                    {setTimeout(function(){
                        this.setState({mode:"result"})
                    }.bind(this), 2700)}
                </div>
            )
        } else if(this.state.mode === "result"){
            // go to result page
            return(
                <div>
                    <Router basename={this.state.quiz_url}>
                        {/* add query string here */}
                        <Redirect to={this.state.result_url} />
                        <Result answers={this.state.answers}/>
                    </Router>
                    {/* Router doesn't work in github page
                    <Router basename={this.state.quiz_url}>
                        <Switch>
                            
                            <Route
                                path={this.state.result_url} // this.props.location.pathname + 
                                component={() => <Result answers={this.state.answers}/>
                            } exact/>
                            <Redirect to={this.state.result_url} />
                        </Switch>
                    </Router> */}
                </div> 
            )   
        }
    }
    
    render(){
        return (
            <div>
                {this.state.mode === "intro" ? this.introPageRender() : this.quizPageRender()}
            </div>
        );
    }
}

export default Intro;