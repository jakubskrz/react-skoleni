// @flow
import * as React from 'react';
import Page from '../components/Page';
import Text from '../components/Text';
import Auth from '../components/Auth';

const Index = () => (
  <Page title="Home">
    <Text>Welcome to React!</Text>
    <Auth />
  </Page>
);

export default Index;
