import React from 'react';
import {Card,CardContent,Typography} from "@material-ui/core";
import "./Message.css";

function Message(props) {
    const username = props.username;
    const messageObject = props.messageObject; 
    console.log(props);
    const isUser = username === messageObject.username;
    console.log(isUser);
    return (
        <div className="message"> 
            <Card className={`message__card ${isUser && "message__user"}`}>
                <CardContent>
                    <Typography
                    color="white" variant="h5" component="h2">
                        {
                          isUser? `${messageObject.message}`:
                         `${messageObject.username || "Anonymous"}:${messageObject.message}`
                        }                    
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Message;
