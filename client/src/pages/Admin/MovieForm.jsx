import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import {addMovie, updateMovie} from "../../api/movies"
import {useEffect} from "react";
function MovieForm({ isModalOpen, setIsModalOpen, isEditMovie }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditMovie) {
      form.setFieldsValue({
        title: isEditMovie.title,
        description: isEditMovie.description,
        poster: isEditMovie.poster,
        genre: isEditMovie.genre,
        language: isEditMovie.language,
        duration: isEditMovie.duration,
        releaseDate: isEditMovie.releaseDate?.substring(0, 10), // optional format
      });
    } else {
      form.resetFields(); // clear form for add new
    }
  }, [isEditMovie, form]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = async (values) => {
    console.log(values);
    if (!isEditMovie) {
      const response = await addMovie(values);
      if(response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } else {
      const editedMovie = values;
      editedMovie.movieId = isEditMovie._id
      const response = await updateMovie(values);
      if(response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    }
    setIsModalOpen(false);
  }

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={onFinish}
      >
        <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          <Col span={24}>
            <Form.Item
              label="Movie Name"
              htmlFor="title"
              name="title"
              className="d-block"
              rules={[{ required: true, message: "Movie name is required!" }]}
            >
              <Input
                id="title"
                type="text"
                placeholder="Enter the movie name"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              htmlFor="description"
              name="description"
              className="d-block"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <TextArea
                id="description"
                rows="4"
                placeholder="Enter the  description"
              ></TextArea>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label="Movie  Duration (in min)"
                  htmlFor="duration"
                  name="duration"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie duration  is required!" },
                  ]}
                >
                  <Input
                    id="duration"
                    type="number"
                    placeholder="Enter the movie duration"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Select Movie Lanuage"
                  htmlFor="language"
                  name="language"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie language  is required!" },
                  ]}
                >
                  <Select
                    id="language"
                    defaultValue="Select Language"
                    style={{ width: "100%", height: "45px" }}
                    onChange={handleChange}
                    options={[
                      { value: "English", label: "English" },
                      { value: "Hindi", label: "Hindi" },
                      { value: "Punjabi", label: "Punjabi" },
                      { value: "Tamil", label: "Tamil" },
                      { value: "Telugu", label: "Telugu" },
                      { value: "Bengali", label: "Bengali" },
                      { value: "German", label: "German" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Release Date"
                  htmlFor="releaseDate"
                  name="releaseDate"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: "Movie Release Date is required!",
                    },
                  ]}
                >
                  <Input
                    id="releaseDate"
                    type="date"
                    placeholder="Choose the release date"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label="Select Movie Genre"
                  htmlFor="genre"
                  name="genre"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie genre  is required!" },
                  ]}
                >
                  <Select
                    defaultValue="Select Movie"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={[
                      { value: "Action", label: "Action" },
                      { value: "Comedy", label: "Comedy" },
                      { value: "Horror", label: "Horror" },
                      { value: "Love", label: "Love" },
                      { value: "Patriot", label: "Patriot" },
                      { value: "Bhakti", label: "Bhakti" },
                      { value: "Thriller", label: "Thriller" },
                      { value: "Mystery", label: "Mystery" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label="Poster  URL"
                  htmlFor="poster"
                  name="poster"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie Poster  is required!" },
                  ]}
                >
                  <Input
                    id="poster"
                    type="text"
                    placeholder="Enter the poster URL"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit the Data
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      
    </Modal>
  )
}

export default MovieForm;