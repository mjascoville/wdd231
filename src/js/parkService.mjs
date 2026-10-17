const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    description:
      "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    description:
      "Learn about the visitor centers in the park."
  }
];

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };

  const response = await fetch(baseUrl + url, options);

  if (response.ok) {
    return await response.json();
  }

  throw new Error("response not ok");
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=yell");
  return parkData.data[0];
}

export function getInfoLinks(images) {
  return parkInfoLinks.map((item, index) => {
    return {
      ...item,
      image: images[index + 2].url
    };
  });
}

export async function getParkAlerts(parkCode) {
  const alerts = await getJson(`alerts?parkCode=${parkCode}`);
  return alerts.data;
}

export async function getParkVisitorCenters(parkCode) {
  const visitorCenters = await getJson(
    `visitorcenters?parkCode=${parkCode}`
  );

  return visitorCenters.data;
}