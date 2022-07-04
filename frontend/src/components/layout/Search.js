import React, { useState } from 'react'

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()

        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <form onSubmit= { searchHandler } role="search">
            <label for="search">Search Projects</label>
            <input 
                type="search" 
                id="search" 
                placeholder="search..." 
                onChange = {(e) => setKeyword(e.target.value)}
                autoFocus required/>
            <button type="submit">Go</button>
        </form>)
}

export default Search
