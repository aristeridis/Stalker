import { Form, Modal } from 'antd'
import React from 'react'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { message } from 'antd'
import { AddNewTheatre, UpdateTheatre } from '../../apicalls/theatres';
function TheatreForm({ showTheatreFormModal, setShowTheatreFormModal, formType, setFormType, selectedTheatre, setSelectedTheatre,getData }) {
    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        values.owner = user.id;
        try {
            dispatch(ShowLoading());
            let response = null;
            if (formType === 'add') {
                response = await AddNewTheatre(values);
            }
            else { 
                values.theatreId = selectedTheatre._id; 
                response = await UpdateTheatre(values);
            }
            if (response.success) {
                message.success(response.message);
                setShowTheatreFormModal(false);
                setSelectedTheatre(null);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return (
        <Modal
            title={formType === 'add' ? 'Προσθήκη Αίθουσας' : 'Επεξεργασία Αίθουσας'}
            open={showTheatreFormModal}
            onCancel={() => {
                setShowTheatreFormModal(false)
                setSelectedTheatre(null)
            }} footer={null}
        >
            <Form onFinish={onFinish}
            initialValues={selectedTheatre}>
                <Form.Item label='Όνομα' name='name' rules={[{ required: true, message: 'Ονομα Αίθουσας' }]}>
                    <input type='text' />
                </Form.Item>
                <Form.Item label='Οδος' name='address' rules={[{ required: true, message: 'Οδος' }]}>
                    <input type='text' />
                </Form.Item>
                <Form.Item label='Email' name='email' rules={[{ required: true, message: 'email' }]}>
                    <input type='text' />
                </Form.Item>
                <div className='flex justify-end gap-1'>
                    <Button title='Cancel' variant="outlined" type='button'
                        onClick={() => {
                            setShowTheatreFormModal(false)
                            setSelectedTheatre(null)
                        }} />
                    <Button title='Save' type="submit" />

                </div>
            </Form>
        </Modal>
    );
}

export default TheatreForm