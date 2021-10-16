import React from "react";
import { useRouter } from "next/router";
import { Flex, Box, Link, Button, Text, Image, Icon } from "@chakra-ui/react";
import { useQuery, useMutation } from "urql";
import { Me } from "../pages/graphql/queries/me.graphql";
import { Logout } from "../pages/graphql/mutations/logout.graphql";
import { FcCamcorderPro } from "react-icons/fc";

export default function Navbar() {
  const router = useRouter();
  const [result] = useQuery({ query: Me });
  const [{ fetching: logoutFetching }, logout] = useMutation(Logout);
  let body = null;

  const { data } = result;

  const signOut = async () => {
    await logout();
    router.reload();
  };

  if (!data?.me) {
    body = (
      <>
        <Link
          href="/login"
          mr={2}
          color="white"
          fontSize="14"
          fontWeight="bold"
          bg="purple"
          pt={2}
          pb={2}
          pl={3}
          pr={3}
          borderRadius="10"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          color="purple"
          fontSize="14"
          fontWeight="bold"
          bg="white"
          p="2"
          borderRadius="10"
        >
          Sign Up
        </Link>
      </>
    );
  } else {
    body = (
      <Flex alignItems="center" justifyContent="center">
        <Box mr={2} color="white">{data.me.name}</Box>
        <Button h="7" onClick={signOut} isLoading={logoutFetching}>
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="gray.900" p={4}>
      <Image />
      <Icon as={FcCamcorderPro} w={8} h={8} mt={-1} mb={-4} mr={2} />
      <Text color="white" fontSize="30" mt={-3} mb={-4} fontWeight="bold">
        Televise
      </Text>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
}
