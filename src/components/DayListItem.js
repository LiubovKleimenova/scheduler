import React from "react";
import "components/DayListItem.scss";
var classNames = require("classnames");


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", props.className, {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = function (spots) {
    if (spots === 0) {
      return `no spots remaining`;
    } else if (spots === 1) {
      return `1 spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
