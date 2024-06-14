import { Col, Form, message, Modal, Row, Table } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { GetAllMovies } from "../../../apicalls/movies";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import {
  GetAllShowsByTheatre,
  AddShow,
  DeleteTheatre,
} from "../../../apicalls/theatres";

function Shows(openShowsModal, setOpenShowsModal, theatre) {
  const [view, setView] = React.useState("table");
  const [shows, setShows] = React.useState([]);
  const dispatch = useDispatch();
  const [movie, setMovie] = React.useState({});
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const moviesResponse = await GetAllMovies();
      if (moviesResponse.success) {
        setMovie(moviesResponse.data);
      } else {
        message.error(moviesResponse.message);
      }
      const showsResponse = await GetAllShowsByTheatre({
        theatreId: theatre._id,
      });
      if (showsResponse.success) {
        setShows(showsResponse.data);
      } else {
        message.error(showsResponse.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  const addShow = async (show) => {
    try {
      dispatch(ShowLoading());
      const response = await AddShow({
        ...show,
        theatre: theatre._id,
      });
      if (response.success) {
        message.success(response.message);
        getData();
        setView("table");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  const deleteTheatre = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteTheatre({
        showId: id,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, record) => {
        return record.movie.title;
      },
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
    },
    {
      title: "Seats",
      dataIndex: "seats",
    },
    {
      title: "Available Seats",
      dataIndex: "availableSeats",
      render: (text, record) => {
        return record.totalSeats - record.bookedSeats.length;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-2 items-center">
            {record.bookedSeats.length === 0 && (
              <i
                className="ri-delete-bin-line"
                onClick={() => {
                  DeleteTheatre(record._id);
                }}
              ></i>
            )}
          </div>
        );
      },
    },
  ];
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <Modal
      title=""
      open={openShowsModal}
      onCancel={() => setOpenShowsModal(false)}
    >
      <h1 className="text-primary text-xl">Theatre : {theatre.name}</h1>
      <div className="flex justify-between items-center">
        <h1 className="text-md">{view === "table" ? "Shows" : "Add Show"}</h1>
        {view === "table" && (
          <Button
            variant="outlined"
            title="Add Show"
            onClick={() => {
              setView("form");
            }}
          />
        )}
      </div>
      {view === "table" && <Table columns={columns} dataSource={shows} />}
      {view === "form" && (
        <Form layout="vertical" onFinish={addShow}>
          <Row gutter={(16, 16)}>
            <Col span={8}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Please enter name movie" }]}
              >
                <input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please enter date" }]}
              >
                <input type="date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please enter time" }]}
              >
                <input type="time" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Movie" name="movie">
                <select>
                  <option value="">Επίλεξε ταινία</option>
                  {movie.map((movie) => (
                    <option value={movie.id}>{movie.title}</option>
                  ))}
                </select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Ticket Price"
                name="ticketPrice"
                rules={[
                  { required: true, message: "Please enter ticket price" },
                ]}
              >
                <input type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Available Seats"
                name="availableSeats"
                rules={[
                  { required: true, message: "Please enter available seats" },
                ]}
              >
                <input type="number" />
              </Form.Item>
            </Col>
            <div className="flex justify-end">
              <Button
                variant="outlined"
                title="Cancel"
                onClick={() => {
                  setView("table");
                }}
              />
              <Button variant="contained" title="Save" type={"submit"} />
            </div>
          </Row>
        </Form>
      )}
    </Modal>
  );
}

export default Shows;
