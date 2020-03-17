import React from "react";
import "components/InterviewerListItem.scss";
let classNames = require("classnames");

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item", props.className, {
    "interviewers__item--selected": props.selected
  });

  const formatName = function(selected) {
    if (selected)
      return `${props.name}`;
  };

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {formatName(props.selected)}
    </li>
  );
}
