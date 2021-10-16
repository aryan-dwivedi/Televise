import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import { changePassword } from "../graphql/mutations/changePassword.graphql";

export default function ChangePasswordPage({ token }) {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState(null);
  const [, password] = useMutation(changePassword);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [count, setCount] = useState(0);
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await password({ newPassword: data.newPassword, token });
    if (response.data?.changePassword.errors) {
      setCount(count + 1);
      setError(response.data.changePassword.errors[0].message);
    } else if (response.data?.changePassword.user) {
      router.push("/");
    }
  };

  useEffect(() => {
    {
      error &&
        toast({
          position: "top-right",
          title: "Error",
          description: error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
    }
  }, [error, count]);
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center"  bg="blackAlpha.800">
      <Flex direction="column" background="blackAlpha.800" p={12} rounded={20}>
        <Heading mb={5} color="white">Change Password</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  {...field}
                  type={show ? "text" : "password"}
                  placeholder="New Password"
                  variant="filled"
                  mb={4}
                  background="white"
                  label="newPassword"
                  _focus={{
                    borderColor: "gray.300",
                    background: "white",
                  }}
                />
                <InputRightElement width="4.5rem">
                  {show ? (
                    <ViewIcon color="gray.300" onClick={handleClick} />
                  ) : (
                    <ViewOffIcon color="gray.300" onClick={handleClick} />
                  )}
                </InputRightElement>
              </InputGroup>
            )}
          />
          <Button
            height="40px"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            width="200px"
            colorScheme="purple"
            type="submit"
          >
            Change Password
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

ChangePasswordPage.getInitialProps = async ({ query }) => {
  return {
    token: query.token,
  };
};
