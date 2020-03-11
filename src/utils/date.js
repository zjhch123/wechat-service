module.exports = function convertTimestamp (timestamp) {
  const ts = timestamp || Date.now();
  const date = new Date(ts);
  const hours = '0' + date.getUTCHours();
  const minutes = '0' + date.getUTCMinutes();
  const seconds = '0' + date.getUTCSeconds();
  const millsec = '00' + date.getUTCMilliseconds();

  const formattedTime = `${hours.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(-2)}.${millsec.slice(-3)}`;

  const year = date.getUTCFullYear();
  const month = '0' + (parseInt(date.getUTCMonth(), 10) + 1);
  const day = '0' + date.getUTCDate();

  const formattedDate = `${year}-${month.slice(-2)}-${day.slice(-2)}`;

  return `${formattedDate} ${formattedTime}`;
};
