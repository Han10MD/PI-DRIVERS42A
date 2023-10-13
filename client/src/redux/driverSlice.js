import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drivers: [],
  allDrivers: [],
  driver: {},
  teams: [],
  originFilter: "",
  postDrivers: [],
};

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    getDrivers: (state, { payload }) => {
      const data = payload;
      state.allDrivers = data;
      state.drivers = data;
    },
    getTeams: (state, { payload }) => {
      const data = payload;
      state.teams = data;
    },
    orderByAtoZ: (state, { payload }) => {
      const data = payload;
      const driversCopy = [...state.allDrivers];
      state.allDrivers = data === "asc"
        ? driversCopy.sort((a, b) => {
            const nameA = a.name.forename || a.name;
            const nameB = b.name.forename || b.name;
            return nameA.localeCompare(nameB);
          })
        : driversCopy.sort((a, b) => {
            const nameA = a.name.forename || a.name;
            const nameB = b.name.forename || b.name;
            return nameB.localeCompare(nameA);
          });
    },
    orderByDOB: (state, { payload }) => {
      const data = payload;
      const driversCopy = state.allDrivers.slice();
      state.allDrivers = data === "asc"
        ? driversCopy.sort((a, b) => {
          const dateA = new Date(a.dob || a.birthDate);
          const dateB = new Date(b.dob || b.birthDate);
          return dateA - dateB;
        })
        : driversCopy.sort((a, b) => {
          const dateA = new Date(a.dob || a.birthDate);
          const dateB = new Date(b.dob || b.birthDate);
          return dateB - dateA;
      });

    },

    filterByTeams: (state, { payload }) => {
      const selectedTeamName = payload;
      const { drivers } = state;

      let filteredDrivers = [];

      if (selectedTeamName === "all") {
        filteredDrivers = [...drivers];
      } else {
        const apiDrivers = drivers.filter((driver) => driver.teams && driver.teams.includes(selectedTeamName));
        const databaseDrivers = drivers.filter((driver) => driver.Teams && driver.Teams.some((team) => team.name.includes(selectedTeamName)));
        filteredDrivers = [...apiDrivers, ...databaseDrivers];
      }

      state.allDrivers = filteredDrivers;
    },
    filterByOrigin: (state, { payload }) => {
      const { drivers } = state;

      let filteredDrivers = [];

      if (payload === "all") {
        filteredDrivers = [...drivers];
      } else if (payload === "numeric") {
        filteredDrivers = drivers.filter((driver) => typeof driver.id === "number");
      } else if (payload === "uuid") {
        filteredDrivers = drivers.filter((driver) => typeof driver.id === "string");
      }

      state.allDrivers = filteredDrivers;
    },
    getDriverById: (state, { payload }) => {
      const data = payload;
      state.driver = data;
    },
    getDriverByName: (state, { payload }) => {
      const data = payload;
      state.allDrivers = data;
      state.drivers = data;
    },
    postDrivers: (state, { payload }) => {
      const data = payload;
      state.postDrivers = data;
    },
  },
});

export const {
  getDrivers,
  getDriverById,
  orderByAtoZ,
  orderByDOB,
  filterByTeams,
  filterByOrigin,
  getDriverByName,
  getTeams,
  postDrivers,
} = driverSlice.actions;

export default driverSlice.reducer;
