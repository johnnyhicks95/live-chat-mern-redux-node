import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import  List from '@material-ui/core/List'
import  ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'

import { CTX } from './Store' 

// from makestyles i can insert css to react
const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2)
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey '
    },
    chatWindow:{
        width: '70%',
        height: '300px',
        padding: '20px'
    },
    chatBox: {
        width: '85%'
        
    },
    button: {
        width: '15%'

    }
}))

export default function Dashboard(){

    // export styles
    const classes = useStyles()

    // CTX store
    const {allChats, sendChatAction }  = React.useContext(CTX)

    console.log({allChats});

    const topics = Object.keys(allChats)
    
    // local state
    const [ activeTopic, changeActiveTopic ] = React.useState(topics[0])

    // using hooks to handle text value
    const [ textValue, changeTextValue ] = useState('')

    return(
        < >
            <Paper classname={classes.root}>
                {/* here is header */}
                <Typography variant="h4" component="h4">
                     Chat app
                </Typography>
                <Typography variant="h5" component="h5">
                     {activeTopic}
                </Typography>
                < div classname={classes.flex}>
                    < div classname={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic => (
                                    <ListItem 
                                        key={topic}
                                        button
                                        onClick={ e=> changeActiveTopic(e.target.innerText) }    
                                    >
                                        <ListItemText primary={topic} />
                                    </ListItem> 

                                ))
                            }
                        </List>
                    </div >
                    < div classname={classes.chatWindow}>
                            {
                                // mapping an object
                                // [{from: 'user', msg: 'hello' }].map((chat, i ) => (
                                allChats[activeTopic].map((chat, i ) => (
                                    <div classname={classes.flex} key={i}>
                                        {/* an avatar */}
                                        <Chip label={chat.from} classname={classes.chip} />
                                        <Typography variant='p' >{chat.msg} </Typography>
                                    </div>
                                ))
                            }
                    </div >
                </div >
                {/* right side */}
                < div classname={classes.flex}>
                    <TextField
                        // id="standard-name"
                        label="Send a chat"
                        className={classes.chatBox}
                        value={textValue}
                        // without hooks: onChange={changeTextValue('name')}
                        onChange={ e => changeTextValue(e.target.value) }
                    />
                    <Button
                        variant="contained"
                        color="primary" 
                        className={classes.button}
                        onClick={ () => {
                            sendChatAction({ 
                                // from: user, 
                                from: '', 
                                msg: textValue,
                                topic: activeTopic 
                            })
                            changeTextValue('')
                        } }
                    >
                        Send 
                    </Button>
                </ div>
            </Paper>
        </>
    )
}