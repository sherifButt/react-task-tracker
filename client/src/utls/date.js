export const dayName = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
   
  return date ? days[new Date(date).getDay()] : days[new Date().getDay()];
};
