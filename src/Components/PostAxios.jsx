import React, { useState } from 'react'
import axios from 'axios';

function CreateUser(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    function handleInputChange(value, setState){
        setState(value);
    }

    // console.log('user', { name, email })

    
    async function handleFromSubmit(e){
        // stop default behaviour of html
        e.preventDefault();
        
        try {
            const requestBody = {
                title: 'foo',
                body: 'bar',
                userId: 1, // post will have separet id
              }
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', requestBody);
            console.log('User created: ', response.data );
        } catch (error) {
            console.error('Error creating User', error)
        }

    }


       
    return (
        <div >
            <h1>Create User</h1>
            <form onSubmit={ handleFromSubmit }>
                <div className='m-5'>
                    <label>Name :</label>
                    <input type="text" value={ name }  onChange={ (e) => handleInputChange(e.target.value, setName)}  className='bg-gray-400 text-gray-700 px-5 py-3 outline-none'/>
                </div>

                <div className='m-5'>
                    <label>Email : </label>
                    <input type="email" value={ email }  onChange={ (e) => handleInputChange(e.target.value, setEmail)} className='bg-gray-400 text-gray-700 px-5 py-3 outline-none'/>
                </div>
                
                <button type='submit'>Create User</button>
            </form>
        </div>
    )
}

function PostAxios() {

  return (
    <div><CreateUser/></div>
  )
}

export default PostAxios;







// steps
// 1. create PostAxios app
// 2. crete a CreateUser funtion and form setup

// 3. using useState() to capture the input and passing the state on submit
// using useState() and along with onChange() event

// if you handle loat of comlexity and loat of cases  using useReducer() 
// useReducer() is a complex state management


// sepreate fun use to both name and email

