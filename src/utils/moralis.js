import Moralis from "moralis";

const signUpUser = async () => {
  const user = new Moralis.User();
  user.set("username", "username");
  user.set("password", "password");
  user.set("email", "email@example.com");

  // other fields can be set just like with Moralis.Object
  user.set("phone", "997");
  user.set("siemanko", "siemanko");
  try {
    await user.signUp();
    // Hooray! Let them use the app now.
  } catch ({ code, message }) {
    // Show the code and error message.
    alert(`Error: ${code} ${message}`);
  }
}

const logInUser = async () => {
  try {
    const user = await Moralis.User.logIn("username", "password");
    // Do stuff after successful login.
    console.log('user', user);
  } catch ({ code, message }) {
    // Show the code and error message.
    alert(`Error: ${code} ${message}`);
  }
}

const authenticate = async () => {
  try {
    const user = await Moralis.authenticate({ signingMessage: "Hello Mages" });
    // Do stuff after successful login.
    console.log('user', user);
  } catch ({ code, message }) {
    // Show the code and error message.
    alert(`Error: ${code} ${message}`);
  }
}

export { logInUser, authenticate, signUpUser }