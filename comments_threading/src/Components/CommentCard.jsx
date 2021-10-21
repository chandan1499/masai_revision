import React from "react";
import { Form } from "./CommentsForm";

export class CommentCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenForm: false,
            showLists: true,
        }
    }

    handleForm = () => {
        this.setState({ isOpenForm: !this.state.isOpenForm });
    }

    handleListStyle = () => {
        this.setState({ showLists: !this.state.showLists });
    }

    handleCommentsReply = (payload, id) => {
        this.setState({ isOpenForm: !this.state.isOpenForm });
        this.props.handleReply(payload, id);
    }

    render() {
        const openForm = this.state.isOpenForm;
        const { comments } = this.props;
        const { handleReply } = this.props;
        const showLists = this.state.showLists;

        return <div>
            <button onClick={this.handleListStyle} style={{background: "none"}}>{showLists ? "-" : "+"}</button>
            <div style={{ borderLeft: "5px solid #383838", paddingLeft: "10px", display: `${showLists ? "inherit" : "none"}` }}>
                <li>
                    <h3>{comments.author}  {comments.points} Points 10 hours ago</h3>
                    <h5>{comments.body}</h5>
                    <button onClick={this.handleForm} style={{ cursor: 'pointer' }}>Reply</button>
                    <div style={{ display: `${openForm ? "inherit" : "none"}` }}>
                        <Form handleFormStyle={this.handleCommentsReply} id={comments.id} />
                    </div>

                    <ul>
                        {
                            (comments.replies ? comments.replies.map((el) => {
                                return <CommentCard handleReply={handleReply} comments={el} />
                            }) : [])
                        }
                    </ul>
                </li>
            </div >
        </div>
    }
}