import axios from 'axios';
import { placesUrl } from '../routes/ngwRoutes';
import { gatherPlaceData } from '../placeParser';
import { point } from '@turf/turf';
//@ts-ignore
import { toMercator } from '@turf/projection';

import wellknown from 'wellknown';

const useApi = () => ({
  addPlace: async (data: any) => {
    try {
      const locationData = await gatherPlaceData(data.url);
      const { lat, lon } = locationData;

      const geom = point([lon, lat]);
      const preparedPoint = wellknown.stringify(toMercator(geom));

      await axios.patch(
        placesUrl,
        [{ fields: { place_name: data.placeName }, geom: preparedPoint }],
        { headers: { Accept: '*/*' } }
      );
    } catch (error) {
      throw error;
    }
  },
});

export { useApi };
