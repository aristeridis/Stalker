import React, { useEffect } from 'react'
import Button from '../../components/Button'
import MovieForm from './MovieForm';
import moment from "moment";
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { DeleteMovie, GetAllMovies } from '../../apicalls/movies';
import { message } from 'antd';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';

function MoviesList() {
    const [movies, setMovies] = React.useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [formType, setFormType] = React.useState("add");
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllMovies();
            if (response.success) {
                setMovies(response.data);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);

        }
    };
    const deleteMovie = async (movieId) => {
        try {
            dispatch(ShowLoading());
            const response = await DeleteMovie({
                movieId,
            });
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };
    const columns = [{
        title: "Poster",
        dataIndex: "poster",
        render: (text, record) => {
            return (
                <img src={record.poster}
                    alt='poster'
                    width='100'
                    height='70' />
            );
        },
    }, {
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
    }, 
    {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => {
            return (<div className='flex gap-2'>
                <i className="ri-pencil-fill"
                    onClick={() => {
                        setSelectedMovie(record);
                        setFormType("edit");
                        setShowMovieFormModal(true);
                    }}></i>
                <i
                    className="ri-delete-bin-line"
                    onClick={() => {
                        deleteMovie(record._id);
                    }}
                ></i>
            </div>
            );
        }
    },
    ];
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
            {showMovieFormModal && (<MovieForm
                showMovieFormModal={showMovieFormModal}
                setShowMovieFormModal={setShowMovieFormModal}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                formType={formType}
                getData={getData}
            />)}
        </div>
    );
}

export default MoviesList;