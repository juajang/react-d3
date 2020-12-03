import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const LinkButton = ({ name, url }) => (
  <Link to={url} style={{ marginLeft: '1rem' }}>
    <Button>{name}</Button>
  </Link>
);

export default LinkButton;