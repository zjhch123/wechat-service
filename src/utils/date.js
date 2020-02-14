module.exports = function convertTimestamp (timestamp) {
  const ts = timestamp || Date.now();
  const date = new Date(ts);
  const hours = date.getHours();
  const minutes = '0' + date.getMinutes();
  const seconds = '0' + date.getSeconds();
  const millsec = '00' + date.getMilliseconds();

  const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}.${millsec.slice(-3)}`;

  const year = date.getFullYear();
  const month = '0' + (parseInt(date.getMonth(), 10) + 1);
  const day = '0' + date.getDate();

  const formattedDate = `${year}-${month.slice(-2)}-${day.slice(-2)}`;

  return `${formattedDate} ${formattedTime}`;
};
