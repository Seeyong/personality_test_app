import React, { Component, Fragment } from 'react';

class Question extends Component {
    render(){
        return(
            <div className="question">
                <p className="question-p">{this.props.question}</p>
                {/* for line break with br tag */}
                {/* <p>{this.props.question.split('\n').map((line) => {return <Fragment key="q1">{line}<br/></Fragment>})}</p> */}
                
            </div>
        );
    }
}

export default Question;