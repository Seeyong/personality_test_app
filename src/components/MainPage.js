import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Logo from '../k_test_logo.png'
import { Button, Card } from 'react-bootstrap';
import TESTS from '../api/TESTS'

class MainPage extends Component{
    constructor(props){
        super(props)
        let i = 0;
        let _all_tests_url = [];
        while (i<TESTS.length) {
        _all_tests_url.push(['/'+TESTS[i].info.mainUrl+'/', TESTS[i].results[0].img_src, TESTS[i].info.mainTitle])
        i = i + 1;
        }
        this.state = {
            all_tests_url:_all_tests_url,
        }
    }

    render(){
        return (
            <Fragment>
                <div className="main container">
                    <img className='logo-img' src={Logo} alt="rea"/>
                    <h1 className='title'>K-test</h1>
                    <h5 className='sub-title'>취향 분석 테스트</h5>
                </div>
                <div className="main-link-div">
                    {this.state.all_tests_url.map((item)=>(
                        <Link to={item[0]} className="main-link-block" key={item[0].replaceAll('/','')}>
                            <Card className="main-card">
                                <Card.Img
                                    src={item[1]}
                                    className="test-img"/>
                                <Card.Body>
                                    <Card.Text><h4>{item[2]}</h4></Card.Text>
                                </Card.Body>
                            </Card>
                            
                        </Link>
                    ))}
                    {/* <Link to="/zipkok/" className="main-link-block">
                        <Card className="main-card">
                            <Card.Img
                                src='https://dl.dropboxusercontent.com/s/fkt02q4cy8onjr7/zipkok_chqhwlqzhrfj.png?dl=0'
                                className="test-img"/>
                            <Card.Body>
                                <Card.Text><h3>집콕 레벨 테스트</h3></Card.Text>
                            </Card.Body>
                        </Card>
                        
                    </Link>
                    <Link to="/zipkok/" className="main-link-block">
                        <Card className="main-card">
                            <Card.Img
                                src='https://dl.dropboxusercontent.com/s/fkt02q4cy8onjr7/zipkok_chqhwlqzhrfj.png?dl=0'
                                className="test-img"/>
                            <Card.Body>
                                <Card.Text><h3>집콕 레벨 테스트</h3></Card.Text>
                            </Card.Body>
                        </Card>
                        
                    </Link> */}
                </div>
            </Fragment>
            
        )       
    }
}

export default MainPage;