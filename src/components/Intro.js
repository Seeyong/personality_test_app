import React, { Component, Fragment } from 'react';
import Quiz from './Quiz'
import Result from './Result'
import Loading from './Loading'
import TESTS from '../api/TESTS'
import Logo from '../k_test_logo.png'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Typist from 'react-typist';

class Intro extends Component {
    constructor(props){
        super(props)
        let _current_test = [];
        let i = 0;
        while (i<TESTS.length) {
            if(TESTS[i].info.mainUrl === this.props.test){
                _current_test = TESTS[i]
                break
            }
            i = i + 1
        }
        // create answer option object for counting each question's answer
        // var answer_obj = {};
        // var j = 0;
        // for(j=0;j<quizQuestions[0].answers.length;j++) {
        // answer_obj[quizQuestions[0].answers[j].type] = 0;
        // };
        this.state = {
            mode:'intro',
            current_test:_current_test,
            qAndA:_current_test.questions,
            quizNumber:0,
            counted_score:0, // < ------------- for calculating scores
            result_url:'/result/',
            quiz_url:window.location.href,
        }
        this._onStartButtonClick = this._onStartButtonClick.bind(this);
    }

    _onStartButtonClick(){
        this.setState({
            mode:'quiz'
        })
    }

    introPageRender(){
        let _mainTitle = this.state.current_test.info.mainTitle;
        let _subTitle = this.state.current_test.info.subTitle;
        
        return (
            <div className="intro container">
                <img className='logo-img' src={Logo} alt="rea"/>
                <h1 className='title'>{_mainTitle}</h1>  
                <h5 className='sub-title'>{_subTitle}</h5>
                <div className='btn-positioner'></div>
                <Typist className="start-btn-participants">
                    현재 총 1,402,052명이 참여했어요.
                </Typist>
                <div className="start-btn-div">
                    <Button
                        onClick={this._onStartButtonClick}
                        variant="dark"
                        size="lg"
                        className="start-btn"
                        bsPrefix="btn"
                    >시작하기
                    </Button>
                </div>
                <div className="intro-footer">
                    <p>MAKER - 케이테스트</p>
                </div>
            </div>
        );
    }

    resultCaculator(){
        let final_score = this.state.counted_score;
        for (let k = 0; k < this.state.current_test.results.length; k++){
            if(this.state.current_test.results[k].score_range.includes(final_score)){
                return this.state.current_test.results[k];
            }
        }
    }
    quizPageRender(){
        if(this.state.mode === "quiz"){
            let _page = <Quiz
            qAndA={this.state.qAndA}
            quizNum={this.state.quizNumber}
            onChangeMode={
                function(_quizNum, _score, _mode) {
                // e.preventDefault();
                // <below for counting answers with TYPE(사자 너구리 펭귄 etc.)>
                // var _answers = Object.assign({}, this.state.answers);
                // _answers[_answer] = _answers[_answer] + 1;
                let _scores = this.state.counted_score + Number(_score)
                this.setState({
                    quizNumber:_quizNum,
                    // answers:_answers, <----- for counting answers with TYPE
                    counted_score:_scores,
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
            let result_contents = this.resultCaculator();
            let final_score_query = result_contents.query // <----------------query export
            
            return(

                <Router basename={"/personality_test_app/"+this.state.current_test.info.mainUrl}>
                    <Route path={this.state.result_url+final_score_query} component={Result}/>
                    <Redirect to={this.state.result_url+final_score_query} />
                    {/* <Result result={result_contents}/> */}
                </Router>
                    // Router doesn't work in github page
                    // <Router basename={this.state.quiz_url}>
                    //     <Switch>
                            
                    //         <Route
                    //             path={this.state.result_url} // this.props.location.pathname + 
                    //             component={() => <Result answers={this.state.answers}/>
                    //         } exact/>
                    //         <Redirect to={this.state.result_url} />
                    //     </Switch>
                    // </Router>

            )   
        }
    }
    
    render(){
        return (
            <Fragment>
                {this.state.mode === "intro" ? this.introPageRender() : this.quizPageRender()}
            </Fragment>
        );
    }
}

export default Intro;