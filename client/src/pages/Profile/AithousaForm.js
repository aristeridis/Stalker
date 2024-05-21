import { Form, Modal } from 'antd'
import React from 'react'
import Button from '../../components/Button'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { message } from 'statuses';

function AithousaForm({ showTheatreFormModal, setShowTheatreFormModal, formType, setFormType, selectedTheatre, setSelectedTheatre }) {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        try {
            dispatch(ShowLoading());
            let response = null;
            if (formType === 'add') { }
            else { }
            if (response.success) {
                message.success(response.message);
                setShowTheatreFormModal(false);
                selectedTheatre(null);
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
            }}>
            <Form onFinish={onFinish}>
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
    )
}

export default AithousaForm