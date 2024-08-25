export const getDateDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();

  difference = difference / 1000; //convert milisecond to second

  let yearDifference = Math.floor(difference / 31536000).toFixed(0);
  difference -= yearDifference * 31536000;

  let monthDifference = Math.floor(difference / 2592000).toFixed(0);
  difference -= monthDifference * 2592000;

  let dayDifference = Math.floor(difference / 86400).toFixed(0);
  difference -= dayDifference * 3600;

  let hourDifference = Math.floor(difference / 3600).toFixed(0);
  difference -= hourDifference * 3600;

  let minuteDifference = Math.floor(difference / 60).toFixed(0);
  difference = (difference - minuteDifference * 60).toFixed(0);

  let message;

  if (yearDifference > 0) {
    message = `${yearDifference} years`;
  } else if (monthDifference > 0) {
    message = `${monthDifference} months`;
  } else if (dayDifference > 0) {
    message = `${dayDifference} days`;
  } else if (hourDifference > 0) {
    message = `${hourDifference} hours`;
  } else if (minuteDifference > 0) {
    message = `${minuteDifference} minutes`;
  } else {
    message = `${difference} seconds`;
  }

  return message;
};
