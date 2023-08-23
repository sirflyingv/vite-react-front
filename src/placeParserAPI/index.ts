import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const xmlParser = new XMLParser();

const parseGoogleData = (url: string) => {
  const urlObject = new URL(url);
  const params = urlObject.pathname.split('/');

  if (params[2] === 'place') {
    const [_, _maps, _place, googleName, coords, _rest] =
      urlObject.pathname.split('/');

    const normalizedGoogleName = decodeURI(googleName).split('+').join(' ');

    const [lat, lon, _position] = coords.slice(1).split(',');
    return { lat, lon, googleName: normalizedGoogleName };
  } else {
    const [_, _type, coords, _rest] = urlObject.pathname.split('/');

    const [lat, lon, _position] = coords.slice(1).split(',');
    return { lat, lon };
  }
};

const getNominatimData = async (lat: string, lon: string) => {
  const res = await axios.get(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&accept-language=en`
  );
  const data = xmlParser.parse(res.data);
  return data;
};

const gatherPlaceData = async (url: string) => {
  // different source strategies later

  const { lat, lon, ...rest } = parseGoogleData(url);
  const geocoderData = await getNominatimData(lat, lon);

  console.log(geocoderData);

  return {
    lat: Number(lat),
    lon: Number(lon),
    urlData: rest,
    nominatimData: {
      country: geocoderData.reversegeocode.addressparts?.country,
      address: geocoderData.reversegeocode.result,
    },
  };
};

export { parseGoogleData, gatherPlaceData };

// https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>&<params>
