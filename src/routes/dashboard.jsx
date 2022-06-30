import React from "react";
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { Link } from "react-router-dom";

import './css/dashboard.css'



function Dashboard(){
    const[name,setName]=useState('');
    const[userName,setuserName]=useState('');
    console.log(name);

    const [listAllLinks,setAllLinks]=useState([]);

     
    async function GetAllLinks(){
            

        const token=localStorage.getItem('token');
        const user=jwt_decode(token);
        const userName=user.userName;
        const obj=await fetch('http://localhost:3001/links/dashboard',{
            headers:{
                'x-access-token':userName
            }
        })
        const data=await obj.json();
        if(data.links){
            // console.log(data);
            setAllLinks(data.links);
            
        }
        

    }

   
    
    useEffect(()=>{
            const token=localStorage.getItem('token');
            if(token){
                const user=jwt_decode(token);
                if(user){
                    setName(user.name);
                    setuserName(user.userName);
                    // const userName=user.userName;
                    GetAllLinks();
                }
                else{
                    localStorage.removeItem('token');
                }
                
            }
            else{
                localStorage.removeItem('token');
                window.location.href='/login'
                console.log('not');
            }
            
    },[])




    const[linkName,setLinkName]=useState('');
    const[linkUrl,setLinkUrl]=useState('');

    
    async function addLink(event){
        const token=localStorage.getItem('token');
        const user=jwt_decode(token);
        const userName=user.userName;
        event.preventDefault();
        // console.log('reach');
        const obj1=await fetch('http://localhost:3001/operation/addlink',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({userName,linkName,linkUrl})
        })
        const data1=await obj1.json();
        alert(data1.status)
        GetAllLinks()
    }

   
    console.log(listAllLinks);
    const[Id,setid]=useState('');
    async function deleteLink(){
        try{console.log(Id);
        const url='http://localhost:3001/operation/deletelink/'+Id;
        console.log(url);
        const obj2=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({Id})
        })
        const data2=await obj2.json();
        console.log(data2.status);
        if(data2.status=="ok"){
            alert("Link deleted");

        }
        else{
            alert("Try after some time")
        }
        window.location.reload();
        }catch(err){
            alert('click once again to delete')
        }
        
    }

    
    const handleClick=event=>{
        setid(event.currentTarget.id);
        
        // console.log(event.currentTarget.id);
        // console.log(id);
        deleteLink();
        
        
    };

    

    return <div className="Dashboard">
        <div><h1 className="name"><span>{name} </span><Link to="../logout" className="logoutlink">Logout</Link></h1></div> 
        
        <div className="dash-body">
            <div className="dash-cont-one">
                <form onSubmit={addLink}>
                    <input
                    value={linkName}
                    onChange={(e)=>setLinkName(e.target.value)}
                    type="text"
                    placeholder="Link-name"
                    required
                    className="linkname"
                    />
                    <input
                    value={linkUrl}
                    onChange={(e)=>setLinkUrl(e.target.value)}
                    type="text"
                    placeholder="URL (add 'http://' at beginning with url)"
                    required
                    className="linkurl"
                    />
                    <input type="submit" value="ADD"/>
                </form>

                <div className="allLinks">
                    {/* <h3>All Links</h3> */}
                    {listAllLinks.map((value,key)=>{
                        return(
                            <div className="link">
                               <div> <h3>{value.linkName}</h3>
                                <p>{value.linkUrl}</p></div>
                                <button id={value._id} onClick={handleClick}><span class="material-symbols-outlined">delete</span></button>
                            </div>
                        ) 
                    })}
                </div>

            </div>
            <div className="dash-cont-two">

                     <h1>Your Link</h1>   
                     <p>http://localhost:3000/links/{userName}</p>
            </div>
        </div>

    </div>
}

export default Dashboard