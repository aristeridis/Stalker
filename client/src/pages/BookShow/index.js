import { message } from "antd";
import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetShowById } from "../../apicalls/theatres";
import moment from "moment";
import { BookShowTickets } from "../../apicalls/booking";
import StripeCheckout from "react-stripe-checkout";
import Button from "../../components/Button";

function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const [selectedSets, setSelectedSets] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({ showId: params.id });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const getSeats = async () => {
    dispatch(ShowLoading());
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = totalSeats / columns;
    return (
      <div className="flex gap-1 flex-col p-2 card">
        {Array.from(Array(rows).keys()).map((seat, index) => {
          return (
            <div className="flex gap-1 justify-center">
              {Array.from(Array(columns).keys()).map((column, index) => {
                const seatNumber = seat * columns + column + 1;

                let seatClass = "seat";
                if (selectedSets.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + "selected-seat";
                }
                if (show.bookedSeats.includes(seat * columns + column + 1)) {
                  seatClass = seatClass + "booked-seat";
                }
                return (
                  seat * columns + column + 1 <= totalSeats && (
                    <div
                      className={seatClass}
                      onClick={() => {
                        const seatNumber = seat * columns + column + 1;
                        if (selectedSets.includes(seatNumber)) {
                          setSelectedSets(
                            selectedSets.filter((item) => item !== seatNumber)
                          );
                        } else {
                          setSelectedSets([...selectedSets, seatNumber]);
                        }
                      }}
                    >
                      <h1 className="text-sm">{seat * columns + column + 1}</h1>
                    </div>
                  )
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  const onToken = async (token) => {
    try {
      const response = await BookShowTickets({
        showId: params.id,
        seats: selectedSets,
        userId: user._id,
        token: token.id,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const book = async () => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        showId: params.id,
        seats: selectedSets,
        userId: user._id,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    show && (
      <div>
        <div className="flex justify-between card p-2 items-center">
          <div>
            <h1 className="text-xl">{show.theatre.name}</h1>
            <h1 className="text-sm">{show.theatre.address}</h1>
          </div>
        </div>
        <div>
          <h1 className="text-2xl uppercase">
            {/*movie*/}
            {show.movie.title}({show.movie.language})
          </h1>
        </div>
        <div>
          <h1 className="text-xl">
            {moment(show.date).format("DD-MM-YYYY")}
            {moment(show.time, "HH:mm").format("HH:mm A")}
          </h1>
        </div>
        {/*seats*/}
        <div className="flex justify-center mt-2">{getSeats()}</div>
        {selectedSets.length > 0 && (
          <div className="mt-2 flex justify-center">
            <StripeCheckout
              currency="EUR"
              token={onToken}
              amount={setSelectedSets.length * show.ticketPrice * 100}
              stripeKey="pk_test_51PU4eVP2an5rwTnGExIKCcTwmkwTji1XODpHucASakzOraHBecMgNl7r22BtyG22aMMVJRW4ZVxntnXQA8GtZm5O001FV6NSMN"
            >
              <Button title="Book now"></Button>
            </StripeCheckout>
          </div>
        )}
      </div>
    )
  );
}

export default BookShow;
