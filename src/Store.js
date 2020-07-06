import React from "react"

import io from 'socket.io-client'

export const CTX = React.createContext()

/* 
msg{
    from: 'user'
    msg: 'hi'
    topic: 'general'
} 

    state: {
        topic1: [
            {msg}, {msg}, {msg}}
        ]
        topic2: [

        ]
    }
*/

const initialState = {
    general: [
        // {msg}, {msg}, {msg}, {newmsg}
        {from: 'person1', msg: 'hello general'},
        {from: 'person2', msg: 'hello'},
        {from: 'person3', msg: 'hello'}
    ],
    topic2:[
        {from: 'person2', msg: 'hello from topic 2'},
        {from: 'person2', msg: 'hello from topic 2'},
        {from: 'person2', msg: 'hello from topic 2'}

    ]
}

function reducer(state, action) {

    const { from, msg, topic } = action.payload

    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [action.payload.topic]:[
                    ...state[action.payload.topic],                    
                    {
                        from: action.payload.from,
                        msg: action.payload.msg
                    }
                ]
                
            }
        default: 
            return state
    }
}

// sockets configuration
let socket;

function sendChatAction( socket, value ) {
    socket.emit('chat message', value)
}


export default function Store(props) {

    const [allChats, dispatch ] = React.useReducer( reducer, initialState )

    if(!socket) {
        socket = io(':3001')
        socket.on('chat message', function(msg){
            console.log({msg});
            dispatch({ type: 'RECEIVE_MESSAGE', payload :msg})
        })
    }

    // create an user just for sketching
    const user = 'adrian' + Math.random(100).toFixed(2)


    return (
        <CTX.Provider  value={{allChats, sendChatAction, user }} >
            {props.children}
        </CTX.Provider>
    )
}  