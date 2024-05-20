import { useState } from "react";
import {useNavigate} from "react-router-dom";
const URL = "http://localhost:5000/api/auth/login";
import { useAuth } from "../store/auth";
export const Login = ()=>{
    const [user, setUser] = useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate();
    const dataChange = (e)=>{
        const name = e.target.name;
        const data = e.target.value;

        setUser({
            ...user,
            [name]:data
        })

    }

    const {storeTokenInLS} = useAuth();
    const formSubmit = async (e)=>{
        e.preventDefault();
        console.log(e);
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        console.log(response);
        if(response.ok){
            const res_data = await response.json();
            console.log(res_data);
            storeTokenInLS(res_data.token);
            alert("Login successful")
            setUser({email:"", password:"",});
            navigate("/login");

        }else{
            alert("Invalid credential");
            console.log("Login form");
        }
    }
    return <>
        <section>
            <div className="registration-body">
                <div className="grid-container container">
                    <div className="registration-img">
                        <img src="/images/login-img.png" alt="A login image" width="400" height="400"/>
                    </div>
                    <div className="registration-form">
                        <form onSubmit={formSubmit}>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="email" name="email" placeholder="Enert your username" value={user.email} onChange={dataChange} autoComplete="off"/>
                        </div>
                        <div>
                            <label htmlFor="password">password</label>
                            <input type="password" name="password" placeholder="Enert your password" value={user.password} onChange={dataChange} autoComplete="off"/>
                        </div>
                        <br />
                        <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}