import "../css/style.css";
import "../css/conditions.css";

import {
  getParkData,
  getParkAlerts,
  getParkVisitorCenters
} from "./parkService.mjs";

import {
  alertTemplate,
  visitorCenterTemplate,
  activityListTemplate
} from "./templates.mjs";

import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
  const alertsContainer = document.querySelector(".alerts > ul");
  const html = alerts.map(alertTemplate);

  alertsContainer.innerHTML = html.join("");
}

function setVisitorCenters(centers) {
  const centersContainer = document.querySelector(".visitor ul");
  const html = centers.map(visitorCenterTemplate);

  centersContainer.innerHTML = html.join("");
}

function setActivities(activities) {
  const activitiesContainer = document.querySelector(".activities ul");
  const html = activityListTemplate(activities);

  activitiesContainer.innerHTML = html;
}

async function init() {
  const parkData = await getParkData();

  const alerts = await getParkAlerts(parkData.parkCode);
  const visitorCenters = await getParkVisitorCenters(
    parkData.parkCode
  );

  setHeaderFooter(parkData);
  setAlerts(alerts);
  setVisitorCenters(visitorCenters);
  setActivities(parkData.activities);
}

init();