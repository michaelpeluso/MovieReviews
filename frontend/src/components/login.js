// import dependencies
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// build Login
const Login = (props) => {
    //          ^^^  parameters passed in via App.js

    // useState variables
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    // update functions
    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };
    const onChangeId = (e) => {
        const id = e.target.value;
        setId(id);
    };

    // set local user variables
    const login = () => {
        props.login({ name: name, id: id });
        props.history.push("/");
    };

    // render
    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={name} onChange={onChangeName} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter id" value={id} onChange={onChangeId} />
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

// export
export default Login;
