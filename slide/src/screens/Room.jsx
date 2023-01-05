import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Room() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);

    const newUser = (e) => {
        e.preventDefault();
        navigate('/Chat', {state: {username : userName}})
    }

  return (
    <section className="d-flex justify-content-center" style={{backgroundColor: 'wheat', height: '100vh'}}>
        <div class="card text-center rounded" style={{backgroundColor: "#FF7D7D", width: '30vw', height: '30vh', marginTop: '10%'}}>
            <div class="card-header">SLIDE</div>
                <div class="card-body">
                <form onSubmit={(e) => newUser(e)}>
                    <div class="form-outline mb-4">
                        <input type="text" id="form1Example1" class="form-control" placeholder="Username" onChange={(event) => { setUserName(event.target.value)}}/>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
    </section>
    
  );
}

export default Room;
