import { useTranslation } from 'react-i18next';
import appRoutes from '../routes/appRoutes';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('mainHeader')}</h1>
      <p>
        {t('placeholder')}
        <a href={appRoutes.mainPage}>{t('placeholder')}</a>
      </p>
    </div>
  );
};

export default MainPage;