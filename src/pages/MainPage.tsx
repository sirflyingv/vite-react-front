import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
// import appRoutes from '../routes/appRoutes';

import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import wellknown from 'wellknown';
import { point } from '@turf/helpers';
//@ts-ignore
import { toMercator } from '@turf/projection';

import { gatherPlaceData } from '../placeParserAPI';
import { placesUrl } from '../routes/ngwRoutes';

const MainPage = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      url: '',
      placeName: '',
    },
    validationSchema: yup.object({
      url: yup.string().url().required(t('mainPage.error.url')),
      placeName: yup.string().required(t('mainPage.error.placeName')),
    }),
    onSubmit: async (data) => {
      try {
        const locationData = await gatherPlaceData(data.url);
        console.log({ name: data.placeName, locationData });
        const { lat, lon } = locationData;

        const geom = point([lon, lat]);
        const preparedPoint = wellknown.stringify(toMercator(geom));

        //
        const resp = await axios.patch(
          placesUrl,
          [
            {
              fields: { place_name: data.placeName },
              geom: preparedPoint,
            },
          ],
          {
            headers: {
              Accept: '*/*',
            },
          }
        );

        console.log(resp);

        //
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {t('mainPage.header')}
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label={t('mainPage.url')}
            name="url"
            autoComplete="url"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.url}
            onBlur={formik.handleBlur}
            error={formik.touched.url && !!formik.errors.url}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="placeName"
            label={t('mainPage.name')}
            type="text"
            id="placeName"
            autoComplete="current-password"
            onChange={formik.handleChange}
            value={formik.values.placeName}
            onBlur={formik.handleBlur}
            error={formik.touched.placeName && !!formik.errors.placeName}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('mainPage.add')}
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      {/* <Button
        onClick={async () => {
          const c = document.cookie;
          console.log(c);
          const res = await axios.get('/api/resource/23');
          console.log(res);
        }}
      >
        fvasdz
      </Button> */}
    </Container>
  );
};

export default MainPage;
