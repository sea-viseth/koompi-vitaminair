import React, { useState } from "react";
import {
  Col,
  Row,
  Layout,
  Form,
  Button,
  Input,
  Upload,
  message,
  Spin,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TopNavbar from "../../Layouts/topNavbar";
import LeftNavbar from "../../Layouts/leftNavbar";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_INITATION } from "../../../graphql/mutation";
import { GET_INITATION } from "../../../graphql/query";
import { useParams } from "react-router-dom";

const { Content, Footer } = Layout;
const EditInitation = ({ history }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const [loading, setLoading] = useState(false);
  const {
    loading: initationLoading,
    data: initationsData,
    refetch: initationrefetch,
  } = useQuery(GET_INITATION, {
    variables: { id },
  });
  const [edit_initation] = useMutation(EDIT_INITATION);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      setState({
        imageUrl: info.file.response.data,
        loading: false,
      });
    }
  };
  const uploadButton = (
    <div>
      {/* {state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div className="ant-upload-text">
        <img
          style={{ maxWidth: "100%" }}
          src="https://backend.byteshare.org/undraw_upload_87y9.svg"
        />
      </div>
    </div>
  );
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const onFinish = (values) => {
    edit_initation({
      variables: {
        ...values,
        image:
          state.imageUrl === null
            ? initationsData.get_initation.image
            : state.imageUrl,
        id: id,
      },
    }).then(async (res) => {
      await message.success("Successfull");
      //   form.resetFields();
      //   setState({
      //     imageUrl: null,
      //     loading: false,
      //   });
      await initationrefetch();
      await history.push("/admin/initations");
    });
    console.log(values);
  };
  if (initationLoading) {
    return (
      <center style={{ marginTop: "100px" }}>
        <Spin style={{ color: "red !important" }} size="large" />
      </center>
    );
  }
  return (
    <React.Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        <LeftNavbar />
        <Layout className="site-layout">
          <TopNavbar />
          <Content style={{ backgroundColor: "#fff" }}>
            <div className="contenContainer">
              <h1 className="title-top">Edit Initation</h1>
              <Form
                form={form}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                layout="vertical"
              >
                <Row gutter={[32, 0]}>
                  <Col span={16}>
                    <Form.Item
                      initialValue={initationsData.get_initation.title}
                      label="Title"
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Please input Title!",
                        },
                      ]}
                    >
                      <Input className="input-style" size="large" />
                    </Form.Item>
                    <Form.Item
                      initialValue={initationsData.get_initation.des}
                      label="Description"
                      name="des"
                      rules={[
                        {
                          required: true,
                          message: "Please input Desciption!",
                        },
                      ]}
                    >
                      <Input.TextArea className="input-style" size="large" />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        className="submit-button"
                        // type="primary"
                        htmlType="submit"
                        size="large"
                        // className="standard-btn"
                      >
                        {loading ? (
                          <small>loading...</small>
                        ) : (
                          <small>SUMBIT</small>
                        )}
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item>
                      <React.Fragment>
                        <Form.Item
                          label="Image"
                          initialValue={initationsData.get_initation.image}
                          name="image"
                        >
                          <Upload.Dragger
                            name="file"
                            // listType="picture-card"
                            className="avatar-uploader"
                            // showUploadList={false}
                            action="https://backend.vitaminair.org/upload/images"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                          >
                            {state.imageUrl === null ? (
                              // <img
                              //   src={`${`http://localhost:3500`}/public/uploads/${
                              //     initationsData.get_initation.image
                              //   }`}
                              //   alt="avatar"
                              //   style={{ width: "100%" }}
                              // />
                              <img
                                // src={`${`https://backend.vitaminair.org/`}/public/uploads/${
                                //   state.imageUrl
                                // }`}
                                src={
                                  "https://backend.vitaminair.org/public/uploads/" +
                                  initationsData.get_initation.image
                                }
                                alt="avatar"
                                style={{ width: "100%" }}
                              />
                            ) : (
                              // <img
                              //   src={`${`http://localhost:3500`}/public/uploads/${
                              //     state.imageUrl
                              //   }`}
                              //   alt="avatar"
                              //   style={{ width: "100%" }}
                              // />
                              <img
                                // src={`${`https://backend.vitaminair.org/`}/public/uploads/${
                                //   state.imageUrl
                                // }`}
                                src={
                                  "https://backend.vitaminair.org/public/uploads/" +
                                  state.imageUrl
                                }
                                alt="avatar"
                                style={{ width: "100%" }}
                              />
                            )}
                          </Upload.Dragger>
                        </Form.Item>
                      </React.Fragment>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default EditInitation;
