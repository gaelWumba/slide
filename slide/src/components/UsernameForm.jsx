import React from "react";
import styled from "styled-components";

function Form(props) {
    
  return (
    <section className="d-flex justify-content-center" style={{backgroundColor: 'wheat', height: '100vh'}}>
        <div class="card" style={{backgroundColor: "#FF7D7D", width: '30vw', height: '30vh', marginTop: '15%'}}>
            <div class="card-header">
                <h1 class="card-title">SLIDE</h1>
            </div>
            <div class="card-body">
                <form onSubmit={props.connect} className='d-flex flex-col justify-content-center'>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={props.username}
                        onChange={props.onChange}
                    />
                    <div style={{marginTop: '10px'}}>
                        <button className="btn btn-sm" type="submit" style={{width: '20%'}}>Connect</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </section>
    
  );
}

const Input = styled.input`
    height: 5vh;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    padding-left: 10px;
`;

export default Form;
