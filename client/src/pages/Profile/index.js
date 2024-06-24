import React from 'react';
import { Tabs } from 'antd';
import PageTitle from '../../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import TheatresList from './TheatresList';

function Profile() {

  return (
    <div>
      <PageTitle title="Profile" />
      <Tabs>
        <div key="bookings" tab="Κρατήσεις">
          bookings
        </div>
        <div key="theaters" tab="Αίθουσες">
          <TheatresList />
        </div>
      </Tabs>
    </div>
  );
}

export default Profile;