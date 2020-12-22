import React, { Component } from 'react';
import Quiz from './Quiz'
import Result from './Result'
import Loading from './Loading'
import quizQuestions from '../api/quizQuestions'
import quizResults from '../api/quizResults'
import Flower from '../ico-flower.png'
import { BrowserRouter as Router, Redirect} from 'react-router-dom';
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
            counted_score:0, // < ------------- for calculating scores
            result_url:'result/',
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
        // <-------------------------------------test/answer template automation
        return (
            <div className="intro container">
                <img src={Flower} alt="rea"/>
                <h1 className='title'>취향 분석 테스트</h1>
                <div>    
                    <h5 className='sub-title'>코로나 집콕 테스트</h5>
                    <div className="start-btn-div">
                        <Button
                            onClick={this._onStartButtonClick}
                            variant="dark"
                            size="lg"
                            className="start-btn"
                            bsPrefix="btn"
                        >시작하기</Button>
                    </div>
                </div>
            </div>
        );
    }

    resultCaculator(){
        let final_score = this.state.counted_score;
        for (var i = 0; i < quizResults.length; i++){
            if(quizResults[i].score_range.includes(final_score)){
                return quizResults[i];
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
                <div>
                    <Router basename={this.state.quiz_url}>
                        {/* add query string here */}
                        <Redirect to={this.state.result_url+final_score_query} />
                        <Result result={result_contents}/>
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