import React from "react";
import { Card, Row, Badge, Button, Col } from "react-bootstrap";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  var border =status === "LEARNED"
  ? "success"
  : status === "LEARNING"
  ? "warning"
  : "danger";

  return (
    <Card className={`shadow border border-${border}`}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                variant={
                  ` border border-${border}`
                }
                className={`text-${border}`}
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
