import { message } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetShowById } from "../../apicalls/theatres";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import StripeCheckout from "react-stripe-checkout";
import Button from "../../components/Button";
import { BookShowTickets, MakePayment } from "../../apicalls/booking";

function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({
        showId: params.id,
      });
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

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="seats-container">
        {Array.from(Array(rows).keys()).map((rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            {Array.from(Array(columns).keys()).map((colIndex) => {
              const seatNumber = rowIndex * columns + colIndex + 1;
              let seatClass = "seat";

              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected-seat";
              }

              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked-seat";
              }

              return (
                seatNumber <= totalSeats && (
                  <div
                    key={seatNumber}
                    className={seatClass}
                    onClick={() => {
                      if (selectedSeats.includes(seatNumber)) {
                        setSelectedSeats(
                          selectedSeats.filter((item) => item !== seatNumber)
                        );
                      } else {
                        setSelectedSeats([...selectedSeats, seatNumber]);
                      }
                    }}
                  >
                    <h1 className="text-sm">{seatNumber}</h1>
                  </div>
                )
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedSeats,
        transactionId,
        user: user._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100
      );
      if (response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    show && (
      <div>
        <div className="flex justify-between card p-2 items-center">
          <div>
            <h1 className="text-sm">{show.theatre.name}</h1>
            <h1 className="text-sm">{show.theatre.address}</h1>
          </div>
          <div>
            <h1 className="text-2xl uppercase">
              {show.movie.title} ({show.movie.language})
            </h1>
          </div>
          <div>
            <h1 className="text-sm">
              {moment(show.date).format("MMM Do yyyy")} -{" "}
              {moment(show.time, "HH:mm").format("hh:mm A")}
            </h1>
          </div>
        </div>

        {/* seats */}
        <div className="flex justify-center mt-2">{getSeats()}</div>

        {selectedSeats.length > 0 && (
          <div className="mt-2 flex justify-center gap-2 items-center flex-col">
            <div className="flex justify-center">
              <div className="flex uppercase card p-2 gap-3">
                <h1 className="text-sm">
                  <b>Selected Seats</b> : {selectedSeats.join(" , ")}
                </h1>
                <h1 className="text-sm">
                  <b>Total Price</b> : {selectedSeats.length * show.ticketPrice}
                </h1>
              </div>
            </div>
            <StripeCheckout
              token={onToken}
              amount={selectedSeats.length * show.ticketPrice * 100}
              billingAddress
              stripeKey="pk_test_51PU4eVP2an5rwTnGExIKCcTwmkwTji1XODpHucASakzOraHBecMgNl7r22BtyG22aMMVJRW4ZVxntnXQA8GtZm5O001FV6NSMN"
            >
              <Button title="Book Now" />
            </StripeCheckout>
          </div>
        )}
      </div>
    )
  );
}

export default BookShow;
