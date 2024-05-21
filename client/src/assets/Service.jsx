import { useAuth } from "../store/auth"

export const Service = ()=>{
    const {service} = useAuth();
    console.log(service);
    return <>
        <div className="service-body">
            <div className="container">
                <h1>Service</h1>
                {
                    service.map(()=>{
                        
                    })
                }
                <div className="card" >
                        <div className="card-img">
                            <img src="/images/service-img.png" alt="`service image`" width="200" />
                        </div>
                        <div className="container">
                            <h4><b>name</b></h4> 
                            <p>price</p> 
                        </div>
                        </div>
            </div>
        </div>
    </>
}