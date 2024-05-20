import { useState } from "react"
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";

export const Contact = ()=>{
    const [contact, setContact] = useState({
        username:"",
        email:"",
        phone:"",
        message:"",
    });
    const [userData, setuserData] = useState(true);
    const {user} = useAuth();

    if(userData && user){
        //console.log(setContact({username: user.username}));
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });
        setuserData(false);
    }
    const navigate = useNavigate();
    const dataChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setContact({
            ...contact,
            [name]:value,
        });
    }

    const formSubmit = async (e)=>{
        e.preventDefault();
        console.log(contact);
        try {
            const response = await fetch(`http://localhost:5000/api/form/contact` ,{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(contact),
        });
        if(response.ok){
            const res_data = await response.json();
            console.log("response from server", res_data);
            setContact({message:"",phone:"",});
            navigate('/contact');
        }
        console.log(response);
        } catch (error) {
            console.log("Error from contact", error);
        }
        
    }
    return <>
        <section>
            <div className="registration-body">
                <div className="grid-container container">
                    <div className="grid-child purple registration-img">
                        <img src="/images/contact-img.png" alt="A registration image" width="400" height="500"/>
                    </div>

                    <div className="grid-child green registration-form">
                        <form onSubmit={formSubmit}>
                        <div>
                            <label htmlFor="username">username:</label>
                            <input type="text" name="username" placeholder="Enert your username" value={contact.username} onChange={dataChange}/>
                        </div>
                        <div>
                            <label htmlFor="email">email:</label>
                            <input type="email" name="email" placeholder="Enert your email" value={contact.email} onChange={dataChange}/>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone::</label>
                            <input type="number" name="phone" placeholder="Enert your phone number" value={contact.phone} onChange={dataChange}/>
                        </div>
                        <div>
                            <label htmlFor="message">message:</label>
                            <textarea name="message" rows="4" cols="50" value={contact.message} onChange={dataChange}></textarea>
                        </div>
                        <br />
                        <button type="submit">Submit</button>
                        </form>
                    </div>
                
                </div>
            </div>
        </section>
    </>
}