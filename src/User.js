import React from 'react';
import {withRouter } from 'react-router-dom'
function User(props) {
    console.warn(props.match.params.id)
    return(
        <div>
            <h2>hello this user no {props.match.params.id}</h2>
        </div>
    )
}
export default withRouter(User);