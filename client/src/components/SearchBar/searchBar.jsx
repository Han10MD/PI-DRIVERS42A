import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from 'axios';

import { getDriverByName } from '../../redux/driverSlice'

const SearchBar = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
            setSearch(e.target.value.trim())
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearch = async () => {
        const { data } = await axios(`http://localhost:3001/drivers/name?name=${search}`)
        dispatch(getDriverByName(data))
        console.log(data);
    }

    return (
        <div>
            <div>
                <input
                    placeholder="Enter a Driver name"
                    id="input-field"
                    type='search'
                    value={search}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    )
}

export default SearchBar