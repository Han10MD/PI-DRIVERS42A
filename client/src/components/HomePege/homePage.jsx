import React, { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';

import DriverCard from '../DriverCard/driverCard'
import Style from './homePage.module.css'

const driversPerPage = 9
const visiblePageButtons = 5;

const HomePage = () => {

    const allDrivers = useSelector(state => state.driver.allDrivers)

    const [totalPages, setTotalPages] = useState(0)

    const [page, setPage] = useState(0)

    useEffect(() => {
        setTotalPages(Math.ceil(allDrivers.length / driversPerPage))
        setPage(0)
    }, [allDrivers])

    if (allDrivers.length === 0) return <h1>Not Drivers Found ...</h1>

    const renderPageButtons = () => {
        const startPage = Math.max(0, Math.min(page - Math.floor(visiblePageButtons / 2), totalPages - visiblePageButtons));
        const endPage = Math.min(startPage + visiblePageButtons, totalPages);

        return Array.from({ length: endPage - startPage }).map((_, i) => {
            const pageNumber = startPage + i;
            const buttonClass = pageNumber === page ? '' : ''; // posibles estilos
            return (
                <button className={buttonClass} type="" key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber + 1}</button>
            );
        });
    };

    return (
        <div className={Style.homePage}>
            <div className={Style.botonesPagina}>
                {page > 0 && (
                    <button type="" onClick={() => setPage(0)}>{'<<'}</button>
                )}
                {renderPageButtons()}
                {page < totalPages - 1 && (
                    <button type="" onClick={() => setPage(totalPages - 1)}>{'>>'}</button>
                )}
            </div>

            <div className={Style.cards}>
                {
                    allDrivers.slice(0 + (page * driversPerPage), driversPerPage + (page * driversPerPage)).map(({ id, name, lastName, teams, image, Teams, dob, birthDate }) => {
                        return (
                            <>
                                <DriverCard
                                    id={id}
                                    key={id}
                                    image={image}
                                    name={name}
                                    lastName={lastName}
                                    teams={teams}
                                    Teams={Teams}
                                    dob={dob}
                                    birthDate={birthDate}

                                />
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
};


export default HomePage