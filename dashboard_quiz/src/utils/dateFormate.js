function getFormattedDate(value, type) {
  // if (!type) return value;

  const date = new Date(value);
  let options;

  if (type === "date") {
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  } else if (type === "time") {
    options = {
      hour: "numeric",
      minute: "numeric",
    };
  } else {
    options = {
      hour: "numeric",
      minute: "numeric",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  }

  return new Intl.DateTimeFormat("en-us", options).format(date);
}

export { getFormattedDate };
