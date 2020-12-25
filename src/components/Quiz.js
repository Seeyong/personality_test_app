import React, { Component } from 'react';
import QuestionCount from './QuestionCount'
import Question from './Question'
import quizQuestions from '../api/quizQuestions'
import { Button } from 'react-bootstrap';
import { Fragment } from 'react';

class Quiz extends Component {
    constructor(props){
        super(props)
        this.state = {
            quizCount:0,
        }
    }
    // the function below is for option randomize
    arrayShuffler(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
          
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    }
    renderAnswerOptions(){
        var qAndA = null;
        qAndA = this.props.qAndA[this.props.quizNum];
        var _questions = [];
        var i = 0;
        var nextQuizNum = this.props.quizNum + 1;
        while(i < qAndA.answers.length){
            // random option push 
            _questions.push(
                <Button
                    key={this.props.quizNum-i}
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
                    variant="outline-dark" 
                    size="lg"
                    className="option-btn"
                >{qAndA.answers[i].content}</Button>)
            i = i + 1;
        }
        _questions = this.arrayShuffler(_questions)
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