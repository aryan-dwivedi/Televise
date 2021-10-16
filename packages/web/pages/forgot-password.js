import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "urql";
import { forgotPassword } from "./graphql/mutations/forgotPassword.graphql";

export default function ForgotPasswordPage() {
  const toast = useToast();
  const [, password] = useMutation(forgotPassword);
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    await password(data);
    setLoading(false);
    setMessages(true);
  };

  useEffect(() => {
    {
      messages &&
        toast({
          position: "top-right",
          description:
            "If an account with that email exist, We will send you a mail.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
    }
  }, [messages]);

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center" bg="blackAlpha.800">
      <Flex direction="column" background="blackAlpha.800" p={12} rounded={20}>
        <Heading mb={5} color="white">Forgot Password</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            height="40px"
            marginLeft="10"
            marginRight="10"
            marginTop="5"
            width="200px"
            colorScheme="purple"
            type="submit"
            isLoading={loading}
            loadingText="Sending Mail"
          >
            Send Mail
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}
