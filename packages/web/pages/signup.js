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
  Link,
  Text,
  Icon,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaUserAlt, FaPen } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "urql";
import { useRouter } from "next/router";
import { Register } from "./graphql/mutations/register.graphql";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState(null);
  const [, register] = useMutation(Register);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await register(data);
    setLoading(false);

    if (response.data?.register.errors) {
      setCount(count + 1);
      setError(response.data?.register.errors[0].message);
    } else if (response.data?.register.user) {
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
          duration: 9000,
          isClosable: true,
        });
    }
  }, [error, count]);

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center" bg="blackAlpha.800">
      <Flex direction="column" background="blackAlpha.700" p={12} rounded={20}>
        <Heading mb={5} color="white">Sign Up</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaPen} color="gray.300" />
                </InputLeftElement>
                <Input
                  {...field}
                  type="name"
                  placeholder="Full Name"
                  variant="filled"
                  mb={4}
                  background="white"
                  label="name"
                  _focus={{
                    borderColor: "gray.300",
                    background: "white",
                  }}
                />
              </InputGroup>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  variant="filled"
                  mb={4}
                  background="white"
                  label="email"
                  _focus={{
                    borderColor: "gray.300",
                    background: "white",
                  }}
                />
              </InputGroup>
            )}
          />

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                <Icon as={FaUserAlt} color="gray.300" />
                </InputLeftElement>
                <Input
                  {...field}
                  type="username"
                  placeholder="Username"
                  variant="filled"
                  mb={4}
                  background="white"
                  label="username"
                  _focus={{
                    borderColor: "gray.300",
                    background: "white",
                  }}
                />
              </InputGroup>
            )}
          />

          <Controller
            name="password"
            control={control}
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
                  label="password"
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
            isLoading={loading}
            loadingText="Registering"
          >
            Register
          </Button>
          <Text fontSize="sm" marginTop="5" color="white">
            Already have an account?{" "}
            <Link color="purple" href="/login">
              Login
            </Link>
          </Text>
        </form>
      </Flex>
    </Flex>
  );
}
