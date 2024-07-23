import timezones from '../data/timezones';

export const getTimeAgo = (dateTime) => {
  let delta = (Date.now() - new Date(dateTime)) / 1000;
  return delta < 60
    ? 'just now'
    : delta < 3600
      ? `${parseInt(delta / 60)}m ago`
      : delta < 24 * 3600
        ? `${parseInt(delta / 3600)}h ago`
        : delta < 365 * 24 * 3600
          ? `${parseInt(delta / 3600 / 24)}d ago`
          : `${parseInt(delta / 3600 / 24 / 365)}y ago`;
};

export const getDateText = (dateString, monthLong = false, showYear = true) => {
  const timestamp = Date.parse(dateString.split('T')[0]);

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: monthLong ? 'long' : 'short',
    year: showYear ? 'numeric' : undefined,
  }).format(timestamp);
};

export const getDate = (timeString) => {
  if (!timeString) {
    return { date: '', time: '' };
  }

  const date = new Date(Date.parse(timeString.slice(0, 19)));

  return {
    date: [
      date.getFullYear(),
      `0${date.getMonth() + 1}`.slice(-2),
      `0${date.getDate()}`.slice(-2),
    ].join('-'),
    time: [
      `0${date.getHours()}`.slice(-2),
      `0${date.getMinutes()}`.slice(-2),
      `0${date.getSeconds()}`.slice(-2),
    ].join(':'),
  };
};

export const setDate = (timestamp) => {
  const date = new Date(timestamp);
  const result = {
    date: [
      date.getFullYear(),
      `0${date.getMonth() + 1}`.slice(-2),
      `0${date.getDate()}`.slice(-2),
    ].join('-'),
    time: [
      `0${date.getHours()}`.slice(-2),
      `0${date.getMinutes()}`.slice(-2),
      `0${date.getSeconds()}`.slice(-2),
    ].join(':'),
  };
  return Object.values(result).join('T');
};

export const getTimezone = (timeString) => {
  const time = timeString.split('T')[1];
  const zoneValue = time
    ? time.substring(time.split(/[+-]/)[0].length)
    : '+00:00';

  return timezones.find((zone) => zone.value === (zoneValue ?? '+00:00'));
};

export const getTimeText = (timeString1, timeString2 = false) => {
  const time1 = timeString1.split('T')[1];

  const result = {
    time1: `${time1.split(':')[0]}:${time1.split(':')[1]}`,
    time2: null,
    zone: getTimezone(timeString1).name,
  };

  if (timeString2) {
    const time2 = timeString2.split('T')[1];
    result.time2 = `${time2.split(':')[0]}:${time2.split(':')[1]}`;
  }

  return `${result.time1}${timeString2 ? ` - ${result.time2}` : ''} (${
    result.zone
  })`;
};
