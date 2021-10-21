import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Flex,
  Heading,
  useToast,
  Icon,
  Text,
  Link,
  LinkOverlay,
} from "@chakra-ui/react";
import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaUserAlt } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import { Login } from "./graphql/mutations/login.graphql";
import NextLink from "next/link";

const schema = yup.object().shape({
  usernameOrEmail: yup.string().required(),
  password: yup.string().min(4).max(20).required(),
});

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState(null);
  const [, login] = useMutation(Login);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [count, setCount] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log(data);
    const response = await login(data);
    if (response.data?.login.errors) {
      setCount(count + 1);
      setError(response.data.login.errors[0].message);
    } else if (response.data?.login.user) {
      router.push("/");
    }
  };

  useEffect(() => {
    {
      error
        ? toast({
            position: "top-right",
            title: "Error",
            description: error,
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        : null;
    }
  }, [error, count]);

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bg="blackAlpha.800"
    >
      <Flex direction="column" background="blackAlpha.700" p={12} rounded={20}>
        <Heading mb={5} color="white">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="usernameOrEmail"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaUserAlt} color="gray.300" />
                </InputLeftElement>
                <Input
                  {...field}
                  placeholder="Username / Email"
                  variant="filled"
                  mb={4}
                  background="white"
                  _focus={{
                    borderColor: "gray.300",
                    background: "white",
                  }}
                  error={!!errors.usernameOrEmail}
                  helperText={
                    errors.usernameOrEmail
                      ? errors.usernameOrEmail?.message
                      : ""
                  }
                />
              </InputGroup>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  {...field}
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  variant="filled"
                  mb={4}
                  background="white"
                  _focus={{
                    borderColor: "gray.300",
                    background: "white",
                  }}
                  label="Password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password?.message : ""}
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
            Login
          </Button>
        </form>
        <Flex justifyContent="center" alignItems="center" direction="column">
          <Text fontSize="sm" mt="5">
            <Link color="blue.600" href="/forgot-password">
              Forgotten password?
            </Link>
          </Text>
          <Button
            height="40px"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            width="200px"
            bg="white"
          >
            <NextLink href="/signup" passHref>
              <LinkOverlay color="purple" fontWeight="bold">
                Create New Account
              </LinkOverlay>
            </NextLink>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
