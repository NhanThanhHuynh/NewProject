import React from "react";
import { PostContext } from "../../contexts/Postcontext";
import { useContext, useEffect } from "react";
import {
  Spinner,
  Card,
  Button,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Toast,
} from "react-bootstrap";
import { AuthContext } from "../../contexts/index";
import SinglePost from "../posts/SinglePost";
import AddpostModal from "../posts/AddpostModal";
import AddIcon from "../../assets/plus-circle-fill.svg";
import UpdatepostModal from '../posts/UpdatepostModal'

const Dashboard = () => {
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { posts, postsLoading,post },
    getPosts,
    SetshowAddPostModal,
    showToast: { show, message, type },
    SetshowToast,
  } = useContext(PostContext);

  //Start : Get all posts
  useEffect(() => getPosts(), []);
  let body = null;
  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" role="status" variant="info" />
      </div>
    );
  } else if (posts.length == 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to my website</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button variant="primary" onClick={SetshowAddPostModal.bind(this,true)}>Learn It</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => {
            return (
              <Col key={post._id} className="my-2">
                <SinglePost post={post} />
              </Col>
            );
          })}
        </Row>

        {/* Open Add Post Modal */}
        <OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
        <Button
          className="btn-floating"
          onClick={SetshowAddPostModal.bind(this, true)}
        >
          <img src={AddIcon} alt="Addicon" width="60" height="60" />
        </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
     <Toast
        show={show}
        style={{ position: "fiexed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white float-left`}
        onClose={SetshowToast.bind(this,{show:false,message:'',type:null})}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong> {message} </strong>
        </Toast.Body>
      </Toast>
      {body}
      <AddpostModal />
      {post !==null && <UpdatepostModal/>}
      {/* After post is added ,show toast */}
     
    </>
  );
};

export default Dashboard;
