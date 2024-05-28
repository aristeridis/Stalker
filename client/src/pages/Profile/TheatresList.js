import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import TheatreForm from "./TheatreForm";
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { message, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllTheatres, GetAllTheatresByOwner } from '../../apicalls/theatres';


function TheatresList() {
    const { user } = useSelector(state => state.users); 
    const [showTheatreFormModal = false, setShowTheatreFormModal] = useState(false);
    const [selectedTheatre = null, setSelectedTheatre] = useState(null);
    const [formType = 'add', setFormType] = useState('add');
    const [theatres = [], setTheatres] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllTheatresByOwner({
                owner: user._id,
            });
            if (response.success) {
                setTheatres(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };
    const deleteTheatre = async (id) => {};
    const columns = [
        {
            title: 'Όνομα',
            dataIndex: 'name',
        },
        {
            title: 'Διεύθυνση',
            dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return <div className='flex gap-2'>
                    <i className="ri-pencil-fill"
                        onClick={() => {
                        setFormType('edit');
                        setSelectedTheatre(record);
                        setShowTheatreFormModal(true);
                        }}></i>
                    <i
                        className="ri-delete-bin-line"
                        onClick={() => {
                            deleteTheatre(record._id);
                        }}
                    ></i>
                </div>
            }
        },
    ];
    useEffect(() => {
        getData();
    }, []);
    
    return (
        <div>
            <div className='flex justify-end'>
                <Button variant='outlined' title='Προσθήκη Αίθουσας'
                    onClick={() => {
                        setFormType('add');
                        setShowTheatreFormModal(true);
                    }}
                />
            </div>
            <Table columns={columns} dataSource={theatres} />
            {showTheatreFormModal && <TheatreForm
                showTheatreFormModal={showTheatreFormModal}
                setShowTheatreFormModal={setShowTheatreFormModal}
                formType={formType}
                setFormType={setFormType}
                selectedTheatre={selectedTheatre}
                setSelectedTheatre={setSelectedTheatre}
                getData={getData}
            />}
        </div>
    )
}

export default TheatresList