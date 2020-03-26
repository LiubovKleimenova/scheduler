import React from 'react';
import 'components/InterviewerListItem.scss';
let classNames = require('classnames');

export default function InterviewerListItem(props) {
  const interviewerClass = classNames('interviewers__item', props.className, {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={() => {
        return props.setInterviewer(props.id);
      }}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
