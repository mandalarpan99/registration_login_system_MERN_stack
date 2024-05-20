import { useState } from "react"
import {useNavigate} from "react-router-dom";
const URL = "http://localhost:5000/api/auth/register";
import { useAuth } from "../store/auth";
export const Register = ()=>{
    const [user, setUser] = useState({
        username:"",
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
        console.log(user);
        try {
        const response = await fetch(`http://localhost:5000/api/auth/register` ,{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user),
        });
        if(response.ok){
            const res_data = await response.json();
            console.log("response from server", res_data);
            storeTokenInLS(res_data.token);
            setUser({username:"", email:"", password:"",});
            navigate('/registration');
        }
        console.log(response);
    } catch (error) {
            console.log("Registration", error)
    }
    }
    return <>
        <section>
            <div className="registration-body">
                <div className="grid-container container">
                    <div className="grid-child purple registration-img">
                        <img src="/images/regirtration-img.png" alt="A registration image" width="400" height="500"/>
                    </div>

                    <div className="grid-child green registration-form">
                        <form onSubmit={formSubmit}>
                        <div>
                            <label htmlFor="username">username:</label>
                            <input type="text" name="username" placeholder="Enert your username" value={user.username} onChange={dataChange}/>
                        </div>
                        <div>
                            <label htmlFor="email">email:</label>
                            <input type="email" name="email" placeholder="Enert your email" value={user.email} onChange={dataChange}/>
                        </div>
                        <div>
                            <label htmlFor="password">password:</label>
                            <input type="password" name="password" placeholder="Enert your password" value={user.password} onChange={dataChange}/>
                        </div>
                        <br />
                        <button type="submit">Registration Now</button>
                        </form>
                    </div>
                
                </div>
            </div>
        </section>
    </>
}