import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

// import axios from 'axios';

// const initialState = {
//   missions: [],
// };
const missionsURL = 'https://api.spacexdata.com/v3/missions';
export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    const response = await fetch(missionsURL);
    const data = await response.json();
    const missionsData = data.map((mission) => ({
      id: mission.mission_id,
      name: mission.mission_name,
      description: mission.description,
      canceled: false,
    }));
    console.log(missionsData);

    return missionsData;
  },
);

const missionsSlice = createSlice({
  name: 'missions',
  initialState: [],
  reducers: {
    JoinMission: (state, action) => state.map((mission) => {
      console.log(current(mission));
      if (mission.id === action.payload) {
        return { ...mission, canceled: !mission.canceled };
      }
      return mission;
    }),
  },
  extraReducers: {
    [fetchMissions.pending]: () => {
      console.log('fetching');
    },
    [fetchMissions.fulfilled]: (state, action) => {
      console.log('success');
      return action.payload;
    },

  },
});

export const { JoinMission } = missionsSlice.actions;
export default missionsSlice.reducer;
