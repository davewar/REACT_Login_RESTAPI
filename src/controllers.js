

const loginUser = async (username, password) =>{

    // console.log("dw controllers");

    try{

          const url = "https://api.bybits.co.uk/auth/token";
         
           const bodyData = {
                username: username,
            password: password,
              type: "USER_PASSWORD_AUTH"
              }

            
          const resData = await fetch(url,{
                  method: "POST",
                  body: JSON.stringify(bodyData),
                  headers: {'Content-Type': 'application/json',
                        'environment': 'mock'}
          })

          // console.log(resData);
          if(resData.status >=200 && resData.status <=299){

            const data = await resData.json()
            

            // console.log("data",data.access_token);
                if(!data){
                  alert("ConTRoller>JS issue with login in, please try again")
                  return "undefined"                
                } 
                 localStorage.setItem('user', data.access_token)
            return data.access_token

          }

          
          



    }
    catch(err){
          console.log("DW ERR", err);

        return "undefined"

    }

}

const getPolicy = async (token)=>{


          
    try{

          const url = "https://api.bybits.co.uk/policys/details";
         

          // const authID = "Bearer MuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0zX3JkdldSMGs";
          const authID = `Bearer ${token}`;
          // console.log(authID);
            
          const resData = await fetch(url,{
                  method: "GET",
                  Authorization: authID,
                  headers: {'Content-Type': 'application/json',
                        'environment': 'mock'}
          })

          const data = await resData.json()
         
             //  console.log(data);
            const {policy_ref,cover} = data.policy
            const {make,model,colour,reg} = data.vehicle
            const {line_1,line_2, postcode} = data.policy.address
            // console.log(policy_ref,cover)
            // console.log(make,model,colour,reg)
            // console.log(line_1,line_2,postcode)
            const address = `${line_1}, ${line_2}, ${postcode} `;
            const car = `${make} ${model} ${colour}-${reg} `;

            let newObj = {
                   policy_ref,
                   cover,
                  "car": car.charAt(0).toUpperCase()+car.slice(1),
                address,
                }
                    // console.log(newObj);
              return newObj
                   

    }
    catch(err){
          console.log("DW ERR", err);
        return

    }


 }




export const uservalidation = {
loginUser,
getPolicy

}