import React, { Component } from 'react'
import FourSquareLogin from './foursquarelogin';
import YelpLogin from "./yelplogin";
export default class CommonLogin extends Component {

    state={
        type:''
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        console.log(this.props.match.params);
        this.setState({type:this.props.match.params.name})
    }
    render() {
        var Inject;
        var type= this.state.type;
        if (type=="yelp"){

            Inject= <YelpLogin />
        }
        else if (type === "foursquare" ){

Inject= <FourSquareLogin />
        }


        return (
            <div>
                
                {/* <YelpLogin /> */}

                {Inject}
                
            </div>
        )
    }
}
