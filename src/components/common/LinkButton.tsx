import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  name: string;
  url: string;
}

const LinkButton = ({ name, url }: LinkButtonProps) => (
  <Link to={url}>
    <Button>{name}</Button>
  </Link>
);

export default LinkButton;