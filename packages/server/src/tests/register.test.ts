import { request } from "graphql-request";
import { createConnection } from "typeorm";

import { host } from "./constants";
import { User } from "../entities/User";


const email = "admin@email.com"
const password = "admin"

const mutation = `
mutation Register {
    register(options: {password: "${password}", email: "${email}"}) {
    }
  }`;


test("Register user", async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  await createConnection();
  
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});

// use a test database
// drop all data once the test is over
// when I run yarn test it also starts the server