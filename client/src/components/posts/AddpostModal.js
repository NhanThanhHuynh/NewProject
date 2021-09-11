import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/Postcontext";

const AddpostModal = () => {
  //Context
  const { SetshowAddPostModal, showAddPostModal, addPost, SetshowToast } =
    useContext(PostContext);
  const closeDialog = () => {
    setnewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    SetshowAddPostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostdata();
    SetshowToast({ show: true, message, type: true ? "success" : "danger" });
  };

  const resetAddPostdata = () => {
    setnewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
    SetshowAddPostModal(false);
  };
  //State
  const [newPost, setnewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, description, url } = newPost;

  const onChangeNewPostForm = (e) =>
    setnewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });

  return (
    <Modal show={showAddPostModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn ?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Description"
              row={3}
              name="description"
              value={description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Learnit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddpostModal;
