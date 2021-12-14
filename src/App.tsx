import React from 'react';
import './App.scss';
import i18n from './app/i18n';
import Title from './shared/components/label/title/title';
import MainContainer from './shared/components/container/main/main'
import PrimaryImage from './shared/components/images/primary-image/primary-image';
import { IMAGE_TYPE } from './shared/constants/image-types.constants';
import DevicesList from './app/modules/devices/devices-list';

function App() {
  return (
    <MainContainer>
      <Title text={i18n.t('global.title')} />
      <PrimaryImage type={IMAGE_TYPE.LOGO}/>
      <DevicesList />
    </MainContainer>
  );
}

export default App;
