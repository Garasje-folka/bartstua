import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import useGlobalState from "../hooks/useGlobalState";

const Verify = () => {
  const { currentUser: user } = useGlobalState();

  const history = useHistory();

  useEffect(() => {
    if (!user) history.push("/");
  }, [user, history]);

  const sendVerification = () => {
    user
      ?.sendEmailVerification()
      .then(() => {
        console.log("Sent email verification");
      })
      .catch(() => {
        console.log("Could not send email verification");
      });
  };

  return (
    <>
      <h2> Du må verifisere e-posten din</h2>
      <Button onClick={sendVerification}> Send verifikasjons e-post </Button>
    </>
  );
};

export default Verify;
