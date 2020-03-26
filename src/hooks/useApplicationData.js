import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //put request to update interviews
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState((prev) => ({ ...prev, appointments }));
      Promise.all([axios.get(`/api/days`)]).then(([days]) => {
        setState((prev) => ({
          ...prev,
          days: days.data,
        }));
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //delete request
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState((prev) => ({ ...prev, appointments }));
      Promise.all([axios.get(`/api/days`)]).then(([days]) => {
        setState((prev) => ({
          ...prev,
          days: days.data,
        }));
      });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.error(err));
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
