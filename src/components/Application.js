import React, {useState, useEffect} from "react";
 
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import getAppointmentsForDay from "helpers/selectors";
const axios = require("axios");

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(()=>{
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`)
    ])
    .then((all) => {
      console.log(all);
      //const [days, appointments] = all;
      //setDays(response.data)}
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }))
      })
    .catch(err => 
      console.error(err)
    )
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appointment => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
