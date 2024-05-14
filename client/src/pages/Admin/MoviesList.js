import React, { useEffect } from 'react'
import Button from '../../components/Button'
import MovieForm from './MovieForm';
import moment from "moment";
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { GetAllMovies } from '../../apicalls/movies';
import { message } from 'statuses';
import { HideLoading } from '../../redux/loadersSlice';

function MoviesList() {
    const [movies, SetMovies] = React.useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [formType, setFormType] = React.useState("add");
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            const response = await GetAllMovies();
            if (response.success) {
                SetMovies(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);

        }
    }
    const columns = [{
        title: "Name",
        dataIndex: "title",
    },
    {
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Duration",
        dataIndex: "duration",
    },
    {
        title: "Genre",
        dataIndex: "genre",
    },
    {
        title: "Language",
        dataIndex: "language",
    },
    {
        title: "Release Date",
        dataIndex: "releaseDate",
        render: (text, record) => {
            return moment(record.releaseDate).format("DD-MM-YYYY")
        }
    }, {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => {
            return <div className='flex gap-2'>
                <i className="ri-pencil-fill"></i>
                <i className="ri-delete-bin-fill"></i>
            </div>
        }
    },
    ]
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className='flex justife-end mb-1'>
                <Button title="Add Movie"
                    variant="outlined"
                    onClick={() => {
                        setShowMovieFormModal(true);
                        setFormType("add");
                    }} />
            </div>
            <Table columns={columns} dataSource={movies} />
            {showMovieFormModal && <MovieForm
                showMovieFormModal={showMovieFormModal}
                setShowMovieFormModal={setShowMovieFormModal}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                formType={formType}
            />}
        </div>
    )
}

export default MoviesList