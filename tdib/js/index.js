
export function main() {
  let now = new Date();
  println(now);

  let opening2020 = newDate(2020, 3, 26);
  let opening2019 = newDate(2019, 3, 20);
  let opening2018 = newDate(2018, 3, 29);

  let numDays = elapsed(opening2020, now);
  let dayNum = numDays + 1;
  let today2020 = addDays(opening2020, numDays);
  let today2019 = addDays(opening2019, numDays);
  let today2018 = addDays(opening2018, numDays);

  let vars = {
    dayNum: dayNum,
    today: dayLabel(today2020),
    today2019_link: getMlbLink(today2019),
    today2019_label: dayLabel(today2019),
    today2018_link: getMlbLink(today2018),
    today2018_label: dayLabel(today2018),
  }
  var template = document.getElementById('template').innerHTML;
  var rendered = Mustache.render(template, vars);
  document.getElementById('content').innerHTML = rendered;
}

export function getMlbLinkElement(date) {
  let link = document.createElement("a");
  link.setAttribute('href', getMlbLink(date));
  link.setAttribute('target', '_blank');
  link.innerText = dayLabel(date);
  return link;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function zeroPad(value, length) {
  let valueStr = ""+value;
  while (valueStr.length < length) {
    valueStr = "0" + valueStr;
  }
  return valueStr;
}

export function getMlbLink(date) {
  // zero padded
  let month = zeroPad(date.getMonth() + 1, 2);
  let day = zeroPad(date.getDate(), 2);
  let year = zeroPad(date.getFullYear(), 4);

  return `https://www.mlb.com/live-stream-games/${year}/${month}/${day}`
}

const WEEK_DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
export function dayLabel(date) {
  let weekDay = WEEK_DAYS[date.getDay()];
  let month = date.getMonth();
  let monthName = MONTH_NAMES[month];
  let day = date.getDate();
  let year = date.getFullYear();
  return `${weekDay} ${monthName} ${day}, ${year}`;
}

export function addDays(date, days) {
  var date = new Date(date.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export function elapsed(dateStart, dateEnd) {
  return parseInt((dateEnd - dateStart) /* ms */
    / 1000 /* seconds */
    / 60 /* minutes */
    / 60 /* hours */
    / 24);
}

export function newDate(year, month, day) {
  return new Date(year, month - 1, day);
}

export function printElem(elem) {
  let contentDiv = document.getElementById("content");
  contentDiv.appendChild(elem);
}

export function println(expr) {
  let contentDiv = document.getElementById("content");
  contentDiv.innerHTML += "<br>" + expr;
}

document.addEventListener("DOMContentLoaded", main);
