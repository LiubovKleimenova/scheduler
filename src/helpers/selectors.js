export function getAppointmentsForDay(state, day) {
  let filteredDays = state.days.filter(newDay => day === newDay.name);
  if (!(filteredDays !== [] && day && filteredDays[0])) {
    return [];
  }
  const appointments = filteredDays[0].appointments;
  const result = [];
  for (let key in state.appointments) {
    if (appointments.includes(state.appointments[key].id)) {
      result.push(state.appointments[key]);
    }
  }
  return result;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null
  }
  const result = {}
  result.student = interview.student;
  result.interviewer = {};
  result.interviewer.id = interview.interviewer;
  result.interviewer.name = state.interviewers[result.interviewer.id].name;
  result.interviewer.avatar = state.interviewers[result.interviewer.id].avatar;
  console.log(result);
  return result;
}
