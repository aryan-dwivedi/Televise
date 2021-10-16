import React, { useState, useEffect } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import VideoPlayer from "../components/VideoPlayer";
import StreamChat from "../components/StreamChat";
import Background from "../components/Background";
import Owner from "../components/Owner";

export default function StreamPage({ token }) {
  return (
      <Box overflow="hidden" position="fixed">
        <Navbar />
        <Background token={token} />
        <Flex marginTop="30px">
          <Owner token={token} />
          <StreamChat />
        </Flex>
      </Box>
  );
}

StreamPage.getInitialProps = async ({ query }) => {
  return {
    token: query.token,
  };
};
