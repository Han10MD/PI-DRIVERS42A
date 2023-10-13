import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, orderByAtoZ, orderByDOB, filterByTeams, filterByOrigin, getTeams } from "../../redux/driverSlice";
import SearchBar from "../SearchBar/searchBar";
import axios from "axios";
import styles from "./navBar.module.css";

const NavBar = () => {
  const drivers = useSelector((state) => state.driver.drivers);
  const teams = useSelector((state) => state.driver.teams);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const URL = "http://localhost:3001/drivers";
  const URLT = "http://localhost:3001/drivers/teams";

  useEffect(() => {
    getAllDrivers();
    getTeamsDrivers();
  }, []);

  const getAllDrivers = async () => {
    try {
      const { data } = await axios(URL);
      dispatch(getDrivers(data));
    } catch (error) {
      throw error.message;
    }
  };

  const getTeamsDrivers = async () => {
    try {
      const { data } = await axios(URLT);
      dispatch(getTeams(data));
    } catch (error) {
      throw error.message;
    }
  };

  const handleOrderByAtoZ = (order) => {
    dispatch(orderByAtoZ(order));
  };

  const handleOrderByDOB = (event) => {
    dispatch(orderByDOB(event.target.value));
  };

  const handleFilterByTeams = (event) => {
    const selectedTeamId = event.target.value;
    dispatch(filterByTeams(selectedTeamId));
  };

  const handleFilterByOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarLeft}>
        <Link to="/home">
          <button className={styles.navBarButton} onClick={getAllDrivers}>
            Home
          </button>
        </Link>
      </div>

      <div className={styles.navBarCenter}>
        {pathname === "/home" && <SearchBar />}
      </div>

      <div className={styles.navBarRight}>
        {pathname === "/home" && (
          <>
            <div className={styles.filterContainer}>
              <label htmlFor="alphabetical">Alphabetical Order:</label>
              <select
                name="alphabetical"
                className={styles.select}
                onChange={(e) => handleOrderByAtoZ(e.target.value)}
              >
                <option disabled defaultValue>
                  Select Order
                </option>
                <option value="asc">From A to Z</option>
                <option value="desc">From Z to A</option>
              </select>
            </div>
            <div className={styles.filterContainer}>
              <label htmlFor="dob">Date of Birth Order:</label>
              <select
                name="dob"
                className={styles.select}
                onChange={handleOrderByDOB}
              >
                <option disabled defaultValue>
                  Select Order
                </option>
                <option value="asc">Oldest First</option>
                <option value="desc">Youngest First</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className={styles.navBarCenter}>
        {pathname === "/home" && (
          <>
            <div className={styles.filterContainer}>
              <label htmlFor="teams">Filter by Team:</label>
              <select
                name="teams"
                className={styles.select}
                onChange={handleFilterByTeams}
              >
                <option value="all">All Teams</option>
                {Array.isArray(teams) &&
                  teams.map((team, index) => (
                    <option key={index} value={team.name}>
                      {team.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className={styles.filterContainer}>
              <label htmlFor="origin">Filter by Origin:</label>
              <select
                name="origin"
                className={styles.select}
                onChange={handleFilterByOrigin}
              >
                <option value="all">All</option>
                <option value="numeric">API DRIVERS</option>
                <option value="uuid">DATA BASE DRIVERS</option>
              </select>
            </div>
          </>
        )}
      </div>

      {pathname !== "/newdriver" && (
        <div className={styles.navBarRight}>
          <Link to="/newdriver">
            <button className={styles.navBarButton}>Create Driver</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
