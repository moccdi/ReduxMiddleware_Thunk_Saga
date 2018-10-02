import React, { Component } from 'react';
import {connect} from "react-redux";
import './App.css';
import {getUser} from "./reducer/user";



class App extends Component {
    fetchTirli = () => {
        this.props.getUser('tirli');
    };



    render(){

        function* genetateNumbers() {
            yield 1;
            yield 2;
            yield 3;
        }
        const generator = genetateNumbers();
        for(let value of generator){
            console.log(value)
        }

        // console.log(generator.next())
        // console.log(generator.next())
        // console.log(generator.next())
        // console.log(generator.next())
        
        
        const {userStatus,user} = this.props;
        console.log(userStatus)
        if(userStatus === 'loading'){
            return 'Loading...';
        }
        if(userStatus === 'failure'){
            return 'Error...';
        }
        if (userStatus === 'failure') {
            return 'Error :(';
        }


        return (
            <div className="app">
                {user && user.name}
                {!user && <button onClick={this.fetchTirli}> login! </button> }
            </div>
        );
    }

}


export default connect(
    ({user}) =>  ({
        user: user.entity,
        userStatus: user.status,
        userErrors: user.error,
    }),
    { getUser }

)(App);

// class App extends Component {
//     fetchTirli = () => {
//         this.props.getUser('tirli');
//     };
//
//     render(){
//         return (
//         <div className="app">
//             {this.props.user.name}
//             <button onClick={this.fetchTirli}> login! </button>
//         </div>
//         );
//     }
//
// }
//
//
// export default connect(
//     ({user}) =>  ({
//       user,
//     }),
//     { getUser }
//
// )(App);
