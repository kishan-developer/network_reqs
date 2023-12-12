import React, { useEffect, useState } from 'react';
import axios from 'axios';


const url = 'https://jsonplaceholder.typicode.com/users';

function CancelNetworkReq() {

    // after get data
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    // usig abortController cancel fetch data
    const abortController = new AbortController();
    console.log('abortController', abortController)

    // fetch the request from api

    // show the error in the UI
    // we want to desplay the data
    // we want to show loading when it is fetching the data

    // using async awit latest syntax 
    async function fetchData() {
        try {
            // install axios
            const response = await fetch(url, {
                // pass the abort signal to fetch
                signal: abortController.signal
            })
            const us = await response.json();
            // console.log(users.data);
            setUsers(us);
            // if you get the data setLoading data is change false
            setLoading(false);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch Request was concelled')
            } else {
                setError('An error occured while fetching data');
                setLoading(false);
            }

        }
    }

    // component are mount after this useEffect will run
    // afeter the perticular component mount this hook use to call the fun
    // q = which case of useEffect => [] empty 
    // useEffect take a two things fun and empty dependency array
    // useEffect(() => {
    //     fetchData()
    // }, [])


    function handleFetchClick() {
        setIsFetching(true)
    }

    function handleCancelClick() {
        setIsFetching(false);
    }


    useEffect(() => {
        if (isFetching) {
            fetchData()
        }

        // cleanup fun to abort the request when the component unmounts or isFetchig becoms false
        return () => {
            abortController.abort();
        }

    }, [isFetching])

    return (
        <div className='p-20 text-xl'>
            <h3 className='text-center text-3xl font-bold text-red-500 font-mono px-10 py-8 mt-3 m-5 rounded-lg bg-sky-900'>Data Fetching</h3>

            {loading && <h3 className='w-full text-center text-5xl font-bold py-20'>Loading Data....</h3>}
            {error && <div> Error : {error} </div>}

            {users.length > 0 && (
                <div>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} className='text-white text-xl font-mono px-10 py-5 mt-3 m-5 rounded-lg bg-sky-500'>
                                {user.name}
                            </li>
                        ))}
                    </ul>


                </div>
            )}

            {!isFetching ? (
                <button onClick={handleFetchClick}>Fetch Data</button>
            ) : (
                <button onClick={handleCancelClick}>Cancel Fetch</button>
            )}

        </div>
    )
}

export default CancelNetworkReq


// inside the error state what is the initial state => bydefault js value asign is undefined and you put null

// const [error, setError] = useState(null);


// click fetdata get data after this click fetch cancel data using AbortController