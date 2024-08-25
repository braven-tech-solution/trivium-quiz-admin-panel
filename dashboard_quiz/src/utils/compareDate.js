function areDatesEqual(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function areDate1IsGreter(date1, date2) {
  if (date1.getFullYear() > date2.getFullYear()) {
    return true;
  } else if (date1.getFullYear() < date2.getFullYear()) {
    return false;
  } else if (date1.getMonth() > date2.getMonth()) {
    return true;
  } else if (date1.getMonth() < date2.getMonth()) {
    return false;
  } else if (date1.getDate() > date2.getDate()) {
    return true;
  } else {
    return false;
  }
}

export const compareDate = (d1, d2) => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  if (areDatesEqual(date1, date2)) {
    return 0;
  } else if (areDate1IsGreter(date1, date2)) {
    return 1;
  } else {
    return -1;
  }
};
