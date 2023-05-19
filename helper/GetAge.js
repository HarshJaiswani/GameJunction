const GetAge = (d) => {
  let dob = new Date(d);
  let time = Math.abs(Date.now() - dob);
  let sec = time / 1000;
  let min = sec / 60;
  let hour = min / 60;
  let day = hour / 24;
  let year = day / 365;
  return Math.floor(year);
};

export default GetAge;
