import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { Tabs } from 'antd';
import MoviesList from './MoviesList';
import TheatresList from './TheatresList';

const { TabPane } = Tabs;

function Admin() {
    const [activeTab, setActiveTab] = useState('movies');

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <div>
            <PageTitle title="Admin" />
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <div key="movies" tab="Ταινίες">
                    <MoviesList />
                </div>
                <div key="theaters" tab="Αίθουσες">
                    <TheatresList />
                </div>
            </Tabs>
        </div>
    );
}

export default Admin;
