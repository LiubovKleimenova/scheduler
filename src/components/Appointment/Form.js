import React, {useState} from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setName(""); 
    setInterviewer(null)
  }
  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
              console.log(name);
            }}
            /*
          This must be a controlled component
        */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={interviewerId => {
            setInterviewer(interviewerId);
          }}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={() => {props.onSave(name, interviewer)
              // setInterviewer(interviewer => {
              //   console.log(interviewer);
              //   return interviewer;
              // });
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}