import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDriverById } from '../../redux/driverSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Style from './detailPage.module.css';

const DatailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/drivers/${id}`);
                const { data } = response;
                dispatch(getDriverById(data));
            } catch (error) {
                console.error(error);
            }
        };

        fetchDriver();
    }, []);

    const driverById = useSelector(state => state.driver.driver);

    let forename = '';
    let surname = '';
    let imageUrl = '';
    let teams = '';
    let nationality = '';
    let description = '';
    let dob = '';


    if (driverById && driverById.name && driverById.lastName) {
        forename = driverById.name;
        surname = driverById.lastName;
    } else if (driverById && driverById.name && driverById.name.forename && driverById.name.surname) {
        forename = driverById.name.forename;
        surname = driverById.name.surname;
    }

    if (driverById && driverById.image && driverById.image.url) {
        imageUrl = driverById.image.url;
    } else if (typeof driverById?.image === 'string') {
        imageUrl = driverById.image;
    }

    if (driverById && driverById.teams || driverById && driverById.Teams) {
        if (driverById.teams) {

            teams = driverById.teams;
        } else if (Array.isArray(driverById.Teams)) {

            teams = driverById.Teams.map(team => team.name).join(', ');
        }
    }

    if (driverById) {
        if (driverById.nationality) {
          nationality = driverById.nationality;
        } else if (driverById.Nationality) {
          nationality = driverById.Nationality;
        }
      
        if (driverById.description) {
          description = driverById.description;
        } else if (driverById.Description) {
          description = driverById.Description;
        }
      
        if (driverById.dob) {
            dob = driverById.dob;
          } else if (driverById.birthDate) {
            const birthDateObj = new Date(driverById.birthDate);
            const year = birthDateObj.getFullYear();
            const month = String(birthDateObj.getMonth() + 1).padStart(2, "0");
            const day = String(birthDateObj.getDate()).padStart(2, "0");
            dob = `${year}-${month}-${day}`;
          }
      }

    return (
        <div className={Style.conteiner}>
            <div className={Style.card}>
                <div className={Style.card_img}>
                    {imageUrl && (
                        <img
                            className={Style.card_img_2}
                            src={imageUrl}
                            alt={`Image of ${forename && forename.slice(0, 1).toUpperCase() + forename.slice(1)}`}
                        />
                    )}
                </div>
                <div className={Style.card_info}>
                    <div className={Style.text_body}>
                        <p className={Style.text_title}>{`ID: ${driverById?.id}`}</p>
                        <h2>
                            {forename && surname && (
                                `${forename.slice(0, 1).toUpperCase() + forename.slice(1)} ${surname.slice(0, 1).toUpperCase() + surname.slice(1)}`
                            )}
                        </h2>
                        <h2>{`Nationality: ${nationality}`}</h2>
                        <h2>{`Description: ${description}`}</h2>
                        <h2>{`DOB: ${dob}`}</h2>
                        <h2>{`Teams: ${teams}`}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatailPage;