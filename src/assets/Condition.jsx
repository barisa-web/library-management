

import React from 'react'

function Condition() {
    let isLoggedIn=true
    if (isLoggedIn){
        return <h1>welcome back!</h1>;
    }
    else{
        return <h1>Please log in.</h1>;
    }
}

export default Condition