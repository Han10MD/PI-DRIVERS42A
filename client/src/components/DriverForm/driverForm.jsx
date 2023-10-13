import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getDrivers, postDrivers } from '../../redux/driverSlice';
import Style from './driverForm.module.css'

const DriverForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const teams = useSelector(state => state.driver.teams);

    const [driverData, setDriverData] = useState({
        name: '',
        lastName: '',
        description: '',
        image: '',
        nationality: '',
        birthDate: '',
        teams: []
    });
    console.log(driverData);

    const [error, setError] = useState({});

    useEffect(() => {
        validate();
    }, [driverData]);

    const handleChange = (event) => {
        setDriverData({
            ...driverData,
            [event.target.name]: event.target.value
        });
        validate();
    };

    const handleTeamChange = (event) => {
        const { value, checked } = event.target;
        const teamId = parseInt(value);

        if (checked) {
            setDriverData((prevState) => ({
                ...prevState,
                teams: [...prevState.teams, teamId]
            }));
        } else {
            setDriverData((prevState) => ({
                ...prevState,
                teams: prevState.teams.filter((team) => team !== teamId)
            }));
        }
        validate();
    };

    const validate = () => {
        let errorValidate = {};

        if (driverData.name.length === 0) {
            errorValidate.name = 'Name must be provided';
        }

        if (driverData.name.length >= 50) {
            errorValidate.name = 'Name can only have 50 characters';
        }

        if (driverData.name.length > 0 && !/^[^0-9]*$/.test(driverData.name)) {
            errorValidate.name = 'Name must contain only characters';
        }

        if (driverData.lastName.length === 0) {
            errorValidate.lastName = 'Last name must be provided';
        }

        if (driverData.lastName.length >= 50) {
            errorValidate.lastName = 'Last name can only have 50 characters';
        }

        if (driverData.lastName.length > 0 && !/^[^0-9]*$/.test(driverData.lastName)) {
            errorValidate.lastName = 'Last name must contain only characters';
        }

        if (driverData.nationality.length === 0) {
            errorValidate.nationality = 'Nationality must be provided';
        }

        if (driverData.description.length < 1 || driverData.description.length > 400) {
            errorValidate.description = 'Description must be between 1 and 400 characters';
        }

        setError(errorValidate);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Object.values(error).length === 0) {
            try {
                const { data } = await axios.post('http://localhost:3001/drivers', driverData);
                dispatch(postDrivers(data));

                const driversInfo = await axios('http://localhost:3001/drivers');
                dispatch(getDrivers(driversInfo.data));

                window.alert("Driver created successfully!");
                navigate('/home');
            } catch (error) {
                window.alert("There is an issue with creating the driver");
            }
        }
    };

    const getMaxDate = () => {
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const maxDateWithoutTime = formatDate(maxDate.toISOString());
        return maxDateWithoutTime;
      };

    return (
        <div className={Style.form}>
            <h1>📍 FORM PAGE | Create a New Driver</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label><br />
                    <input className={Style.imput} required type="text" name="name" value={driverData.name} onChange={handleChange} placeholder="Enter name" />
                    {
                        error.name && <p>{error.name}</p>
                    }
                </div>
                <br />

                <div>
                    <label htmlFor="lastName">Last Name:</label><br />
                    <input className={Style.imput} required type="text" name="lastName" value={driverData.lastName} onChange={handleChange} placeholder="Enter last name" />
                    {
                        error.lastName && <p>{error.lastName}</p>
                    }
                </div>
                <br />

                <div>
                    <label htmlFor="nationality">Nationality:</label><br />
                    <input className={Style.imput} required type="text" name="nationality" value={driverData.nationality} onChange={handleChange} placeholder="Enter nationality" />
                    {
                        error.nationality && <p>{error.nationality}</p>
                    }
                </div>
                <br />

                <div>
                    <label htmlFor="image">Image:</label><br />
                    <input className={Style.imput} required type="text" name="image" value={driverData.image} onChange={handleChange} placeholder="Enter image URL" />
                </div>
                <br />

                <div>
                    <label htmlFor="birthDate">Fecha de Nacimiento:</label><br />
                    <input
                        required
                        type="date"
                        name="birthDate"
                        max={getMaxDate()}
                        value={driverData.birthDate}
                        onChange={handleChange}
                    />
                </div>
                <br />

                <div>
                    <label htmlFor="description">Description:</label><br />
                    <textarea className={Style.imput} required name="description" value={driverData.description} onChange={handleChange} placeholder="Enter description"></textarea>
                    {
                        error.description && <p>{error.description}</p>
                    }
                </div>
                <br />

                <div className={Style.teams}>
                    <label htmlFor="teams">Teams:</label>
                    <br />
                    {Array.isArray(teams) &&
                        teams.map((team) => (
                            <div key={team.id}>
                                <input
                                    type="checkbox"
                                    id={team.id}
                                    name="teams"
                                    value={team.id}
                                    checked={driverData.teams.includes(team.id)}
                                    onChange={handleTeamChange}
                                />
                                <label htmlFor={team.id}>{team.name}</label>
                            </div>
                        ))}
                </div>
                <br />

                <div>
                    <button type="submit">Create Driver</button>
                </div>
            </form>
        </div>
    );
};

export default DriverForm;





