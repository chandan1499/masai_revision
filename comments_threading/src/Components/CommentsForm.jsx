import React from "react";
import { v4 as uuid } from "uuid";

export class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payload: {
                id: uuid(),
                author: "Chandan Gupta",
                body: "",
                timestamp: "Sun Aug 02 2020 18:08:45 GMT+0530",
                points: "2",
                replies: null
            }
        }
    }

    handleChange = (e) => {
        let payload = this.state.payload;
        payload.body = e.target.value;

        this.setState(() => {
            return {
                ...this.state,
                payload: payload
            }
        })
    }

    handleSubmit = (e) => {
        let payload = this.state.payload;
        payload.id = uuid();
        this.setState({
            payload: {...payload, ["body"]: ""}
        })
        this.props.handleFormStyle(payload, this.props.id);
    }

    render() {
        return <div>
            <input type="text" value={this.state.payload.body} onChange={this.handleChange} />
            <button onClick={this.handleSubmit}>Add</button>
        </div>
    }
}