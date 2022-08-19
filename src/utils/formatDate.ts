const formatUnit = (unit: string) => (unit.length < 2 ? '0' + unit : unit);

const formatDate = (date: number) => {
  const d = new Date((date + '').length === 10 ? date * 1000 : date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = '' + d.getFullYear(),
    hour = '' + d.getHours(),
    minute = '' + d.getMinutes(),
    second = '' + d.getSeconds();

  return (
    [year, month, day].map(formatUnit).join('-') +
    ' ' +
    [hour, minute, second].map(formatUnit).join(':')
  );
};


export default formatDate;