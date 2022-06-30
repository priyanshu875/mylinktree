import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";


import './css/userlinks.css'


function UserLinks(){
    
    const[name,setname]=useState('');
    const[linkslist,setlinkslist]=useState([]);

    const userid=useParams().userid;
    async function getuserlinks(){
        
        const obj=await fetch('http://localhost:3001/links',{
            headers:{
                'x-access-tokens':userid
            }
        })
        const data=await obj.json();
        console.log(data);
        if(data.status=='ok'){
            setname(data.name);
            setlinkslist(data.links)
        }
        else{
            document.write('no-links-found'); 
            // setTimeout(function(){
            //     window.location.href='../'
            // },4000)  
        }
        
        
        // console.log(linkslist[0].linkName);
    }
    
   

    useEffect(()=>{
        getuserlinks();
        
    },[])

    


    return <div className="userLinks">
        <div className="centered-div">
            <h1>Hello,I am</h1>
            <p className="user-name">{name}</p>
            <div className="linkslist">
                {linkslist.map((value,key)=>{
                    return (<a href={value.linkUrl} className="link-div">
                        <span className="material-symbols-outlined">link</span>
                        <p>{value.linkName}</p>
                    </a>)
                })}
            </div>

        </div>

    </div>
}

export default UserLinks