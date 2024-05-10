import React from 'react'
import { Col, Form, Modal, Row } from 'antd'
import Button from '../../components/Button';
import FormItem from 'antd/es/form/FormItem'
import { useDispatch } from "react-redux"
import { message } from 'statuses';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { AddMovie } from '../../apicalls/movies';


function MovieForm({ showMovieFormModal, setShowMovieFormModal, selectedMovie, setSelectedMovie, formType }) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      let response = null
      if (formType === "add") {
        response = await AddMovie(values)
      } else {

      }
      if (response.success) {
        message.success(response.message);
        setShowMovieFormModal(false);
      } else {
        message.error(response.message);

      } dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message)

    }
  };
  return (
    <Modal
      title={formType === "add" ? "Add Movie" : "Edit Movie"}
      open={showMovieFormModal}
      onCancel={() => setShowMovieFormModal(false)}
      footer={null}
      width={800}
    >

      <Form layout='vertical' onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Τίτλος Ταινίας" name="title">
              <input type='text' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Περιγραφή Ταινίας" name="description">
              <textarea type='text' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Διάρκεια ταινίας" name="duration">
              <input type='text' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Γλώσσα" name="language">
              <input type='text' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Κυκλοφορία" name="releaseDate">
              <input type='text' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Κατηγορία" name="genre">
              <input type='text' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Poster" name="poster">
              <input type='text' />
            </Form.Item>
          </Col>
        </Row>
        <div className='flex justify-end'>
          <Button title='Cancel' variant="outlined" type='button'
            onClick={() => setShowMovieFormModal(false)} />
          <Button title='Save' type="submit" />


        </div>
      </Form>

    </Modal>
  )
}
export default MovieForm