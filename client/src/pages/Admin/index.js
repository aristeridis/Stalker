import React from 'react'
import PageTitle from '../../components/PageTitle'
import { Tabs } from 'antd'
import MoviesList from './MoviesList'
import AithousesList from './AithousesList'
const { TabPane } = Tabs;
function Admin() {
    return (
        <div>
            
            <PageTitle title="Admin" />
            <Tabs defaultActiveKey='1'>
                <Tabs.TabPane tab="Ταινίες" key='1'>
                    <MoviesList/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Αίθουσες" key='2'>
                    <AithousesList/> 
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Admin