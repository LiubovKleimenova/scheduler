import React from "react";
import "components/InterviewerListItem.scss";
var classNames = require("classnames");

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        id={props.id}
      />
      {props.name}
    </li>
  );
}
