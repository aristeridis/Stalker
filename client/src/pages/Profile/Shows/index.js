import { Modal, Table } from 'antd'
import React from 'react'
import Button from '../../../components/Button';

function Shows(openShowsModal, setOpenShowsModal, theatre) {
    const [view, setView] = React.useState("table");
    const [shows, setShows] = React.useState([]);
    const columns=[{
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Time',
        dataIndex: 'time',
    },
    {
        title:'Movie',
        dataIndex:'movie'
    },
    {
        title:'Ticket Price',
        dataIndex:'ticketPrice'
    },
    {
        title:'Seats',
        dataIndex:'seats'
    },
    {
        title:'Available Seats',
        dataIndex:'availableSeats'
    },
    {
        title:'Action',
        dataIndex:'action',
    },
]
    return (
        <Modal
            title=""
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}>
                <h1 className='text-primary text-xl'>Theatre : {theatre.name}</h1>
                <div className='flex justify-between items-center'>
                    <h1 className='text-md'>{view === "table" ? "Shows" : "Add Show"}</h1>
                    <Button
                    variant="outlined"
                    title="Add Show"
                    onClick={() => {setView("form");

                    }}/>
                </div>
                {view === "table" &&(<Table columns={columns} dataSource={shows}/>)}
     </Modal>
    );
}

export default Shows