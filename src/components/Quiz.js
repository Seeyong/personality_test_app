import React, { Component } from 'react';
import QuestionCount from './QuestionCount'
import Question from './Question'
import quizQuestions from '../api/quizQuestions'
import { Button } from 'react-bootstrap';

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
            quizCount:0,
        }
    }

    renderAnswerOptions(){
        var qAndA = null;
        qAndA = this.props.qAndA[this.props.quizNum];
        var _questions = [];
        var i = 0;
        var nextQuizNum = this.props.quizNum + 1;
        while(i < qAndA.answers.length){
            _questions.push(
                <Button
                    key={i}
                    value={qAndA.answers[i].score} 
                    onClick={function(e) {
                        e.preventDefault();
                        if(this.props.quizNum === quizQuestions.length-1){
                            this.props.onChangeMode(nextQuizNum, e.target.value, "loading"); //result
                        } else {
                            this.setState({
                                quizCount:this.state.quizCount+1 // for Quiz Counting => QuestionCount.js
                            })
                            this.props.onChangeMode(nextQuizNum, e.target.value, "quiz");
                        }
                    }.bind(this)}
                    variant="light" 
                    size="lg"
                    className="option-btn"
                >{qAndA.answers[i].content}</Button>)
            
            i = i + 1;
        }
        return(
            _questions
        )
    }
    render(){
        
        return(
            <div className="quiz">
                <Question question={this.props.qAndA[this.props.quizNum].question}></Question>
                <div className="option-btn-div">
                    {this.renderAnswerOptions()}
                </div>
                <QuestionCount totalCount={this.props.qAndA.length} quizCount={this.state.quizCount}></QuestionCount>
            </div>
        );
    }
}

export default Quiz;