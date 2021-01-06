import React, { Component } from 'react'
import AppleLogin from './applelogin';
import AvvoLogin from './avvologin';
import CitySearchLogin from './citysearchlogin';
import DnbLogin from './dnblogin';
import FourSquareLogin from './foursquarelogin';
import HereLogin from './herelogin';
import InstagramLogin from './instagramlogin';
import TomtomLogin from './tomtomlogin';
import YelpLogin from "./yelplogin";
import ZillowLogin from './zillowlogin';
import ZomatoLogin from './zomatologin';
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

        else if (type === "instagram" ){

            Inject= <InstagramLogin/>
                    }
                    else if (type === "avvo" ){

                        Inject= <AvvoLogin/>
                                }
                                else if (type === "dnb" ){

                                    Inject= <DnbLogin/>
                                    
                                            }
                                            else if (type === "apple" ){

                                                Inject=<AppleLogin/>
                                                        }
                                                        else if (type === "citysearch" ){

                                                            Inject=<CitySearchLogin/>
                                                                    }
                                                                    else if (type === "zillow" ){

                                                                        Inject= <ZillowLogin/>
                                                                                } else if (type === "tomtom" ){

                                                                                    Inject= <TomtomLogin/>
                                                                                            } else if (type === "zomato" ){

                                                                                                Inject= <ZomatoLogin/>
                                                                                                        }
                                                                                                        else if (type === "here" ){

                                                                                                            Inject= <HereLogin/>
                                                                                                                    }


        return (
            <div>
                
                {/* <YelpLogin /> */}

                {Inject}
                
            </div>
        )
    }
}
