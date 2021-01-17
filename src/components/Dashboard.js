import React, {useState, useEffect } from 'react'

import {uservalidation} from '../controllers.js'

import { useGlobalContext } from './context';   // global state

import { useHistory } from "react-router-dom";


const Dashboard = () => {
    // console.log("DASHBOARD");

      const {  stopAuth, token,setToken} = useGlobalContext();  // used on log off btn to change state of auth + loggedin
        let history = useHistory(); //to use redirect

        const initial = {
            car:"",
            cover:"",
             address:"",
             policy_ref:""
        }

       

        const [clientData, setClientData] = useState(initial)

        const userDetails = async () =>{

                const user = await uservalidation.getPolicy(token)  
                
                const {car,cover, address,policy_ref} = user
                // console.log("DW",car,cover, address,policy_ref);

                setClientData({...clientData, car,cover, address,policy_ref})

        }

        useEffect(() => {
           userDetails()
        }, [])

        const closeLogin = (e)=>{

           stopAuth() // turn off auth
           setToken(null) // reset 

                //clear local
           localStorage.removeItem('user');

           //redirect
            history.push('/home');
        }
            

    return (
                 
          <>

                
                <div style={container}>

                    <button onClick={closeLogin}>Log out</button>

                <h1>My Policy</h1>
                <br/>
            
                <h4>Policy reference</h4>
                <p>{clientData.car}</p>
                <br/>
                
                <h4>Cover Type</h4>
                <p>{clientData.cover}</p>
                <br/>
                
                <h4>Car</h4>
                <p>{clientData.car}</p>
                <br/>
                
                <h4>Address</h4>
                <p>{clientData.address}</p>
                <br/>
        
               </div>
       
         </>
    )
}

const container ={
    background: "lightgrey"
   

}

export default Dashboard
