import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/Postcontext";

const UpdatepostModal = () => {
  //Context
  const {
    SetshowUpdatePostModal,
    showUpdatePostModal,
    updatePost,
    SetshowToast,
    postState: { post },
  } = useContext(PostContext);

  //Render post
  useEffect(() => {
    setnewPost(post);
  }, [post]);

  //Close
  const closeDialog = () => {
    setnewPost(post);
    SetshowUpdatePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(newPost);
    closeDialog();
    SetshowToast({ show: true, message, type: true ? "success" : "danger" });
  };

  //State
  const [newPost, setnewPost] = useState(post);
  const { title, description, url, status } = newPost;

  const onChangeNewPostForm = (e) =>
    setnewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making Progress ?</Modal.Title>
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
          <Form.Group>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChangeNewPostForm}
            >
              <option value="TO LEARN"> TO LEARN</option>
              <option value="LEARNING"> LEARNING</option>
              <option value="LEARNED"> LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Learnit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatepostModal;
