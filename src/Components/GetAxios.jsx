import React, { useEffect, useState } from 'react';
import axios from 'axios';


const url = 'https://jsonplaceholder.typicode.com/users';

function GetAxios() {

    // after get data
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading , setLoading] = useState(true);

    // fetch the request from api

    // show the error in the UI
    // we want to desplay the data
    // we want to show loading when it is fetching the data

    // using async awit latest syntax 
    async function fetchData() {
        try {
            // install axios
            const response = await axios.get(url);
            console.log(response.data);
            setUsers(response.data);
            // if you get the data setLoading data is change false
            setLoading(false);
        } catch (error) {
            setError('An error occured while fetching data');
            setLoading(false);
        }
    }

    // component are mount after this useEffect will run
    // afeter the perticular component mount this hook use to call the fun
    // q = which case of useEffect => [] empty 
    // useEffect take a two things fun and empty dependency array
    useEffect(() => {
        fetchData()
    }, [])

    if(loading){
        return <h3 className='w-full text-center text-5xl font-bold py-20'>Loading Data....</h3>
    }

    if(error){
        return <div> Error : {error} </div>
    }

    return (
        <div className='bg-black p-20 text-xl'>
            <h3 className='text-center text-3xl font-bold text-red-500 font-mono px-10 py-8 mt-3 m-5 rounded-lg bg-sky-900'>User List</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className='text-white text-xl font-mono px-10 py-5 mt-3 m-5 rounded-lg bg-sky-500'>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GetAxios


// inside the error state what is the initial state => bydefault js value asign is undefined and you put null 

// const [error, setError] = useState(null);