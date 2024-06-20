import { message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetShowById } from "../../apicalls/theatres";
import moment from "moment";

function BookShow() {
  const [show, setShow] = React.useState(null);
  const params = useParams();
  const dispatch = useDispatch();
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

  React.useEffect(() => {
    getData();
  }, []);
  return (
    show && <div>
      <div className="flex justify-between card p-2 items-center">
        <div>
          <h1 className="text-xl">{show.theatre.name}</h1>
          <h1 className="text-sm">{show.theatre.address}</h1>
        </div>
      </div>
      <div>
        <h1 className="text-2xl uppercase">{/*movie*/}
          {show.movie.title}({show.movie.language})
        </h1>
      </div>
      <div>
        <h1 className="text-xl">{moment(show.date).format("DD-MM-YYYY")}{moment(show.time,'HH:mm').format("HH:mm A")}</h1>
    
      </div>
    </div>
  );
}

export default BookShow;
