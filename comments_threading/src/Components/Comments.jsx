import React from "react";
import { CommentCard } from "./CommentCard";
import { Form } from "./CommentsForm";

export class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [
                {
                    id: "001",
                    author: "Chandan Gupta",
                    body: "Whats the status?",
                    timestamp: "Sun Aug 02 2020 18:08:45 GMT+0530",
                    points: "2",
                    replies: [
                        {
                            id: "003",
                            author: "haren",
                            body: "Wrote the test suites, waiting for approval?",
                            timestamp: "Sun Aug 02 2020 18:12:45 GMT+0530",
                            points: "3",
                            replies: [
                                {
                                    id: "004",
                                    author: "albert",
                                    body: "Thanks for the update!",
                                    timestamp: "Sun Aug 02 2020 18:15:45 GMT+0530",
                                    points: "8",
                                    replies: null
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    findByIdAndUpdate(id, payload, data) {
        if(!data) {
            return;
        }

        data.map((el) => {
            if(el.id === id){
                let temp = el;
                if(!temp.replies){
                    temp.replies = []
                }
                temp.replies = [...temp.replies, {...payload}];
                console.log("after ",temp.replies);
                return temp;
            }
            else{
                this.findByIdAndUpdate(id, payload, el.replies);
            }

            return el;
        })
    }

    handleReply = (payload, id) => {
        if(!id){
            this.setState({
                comments: [...this.state.comments, {...payload}]
            })
            return;
        }
        this.findByIdAndUpdate(id, payload, this.state.comments);
    }

    

    render() {
        const comments = this.state.comments;

        return <div>
            <Form handleFormStyle={this.handleReply} id={null} />
            <ul>
                {
                    comments?.map((el) => {
                        return <CommentCard handleReply={this.handleReply} comments={el} />
                    })
                }
            </ul>
        </div>
    }
}