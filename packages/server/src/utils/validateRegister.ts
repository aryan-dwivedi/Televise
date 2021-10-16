export const validateRegister = (username, email, password) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase()) === false) {
    return [
      {
        field: "email",
        message: "Invalid Email",
      },
    ];
  }

  if (password.length <= 4) {
    return [
      {
        field: "password",
        message: "Password length must be greater than 4",
      },
    ];
  }

  if (username.length <= 3) {
    return [
      {
        field: "username",
        message: "Username length must be greater than 3",
      },
    ];
  }

  return null;
};