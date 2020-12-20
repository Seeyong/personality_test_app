import React, { Component } from 'react';

class Question extends Component {
    render(){
        return(
            <div className="question">
                <h2>{this.props.question}</h2>
            </div>
        );
    }
}

export default Question;