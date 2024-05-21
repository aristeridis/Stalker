import React, { useState } from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import TheatreForm from "./AithousaForm";


function AithousesList() {
    const [showTheatreFormModal = false, setShowTheatreFormModal] = useState(false);
    const [selectedTheatre = null, setSelectedTheatre] = useState(null);
    const [formType = 'add', setFormType] = useState('add');
    const [theatres = [], setTheatres] = useState([]);

    const navigate = useNavigate();
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
            {showTheatreFormModal && <TheatreForm
                showTheatreFormModal={showTheatreFormModal}
                setShowTheatreFormModal={setShowTheatreFormModal}
                formType={formType}
                setFormType={setFormType}
                selectedTheatre={selectedTheatre}
                setSelectedTheatre={setSelectedTheatre}
            />}
        </div>
    )
}

export default AithousesList