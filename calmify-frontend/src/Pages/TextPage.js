import React from "react";
import { Button, Heading, Textarea } from "@chakra-ui/react";

const TextPage = () => {
  return <div>
    <Heading>Enter the text</Heading>
    <Textarea placeholder='Here is a sample placeholder' />
    <Button>Submit</Button>
    </div>;
};

export default TextPage;
