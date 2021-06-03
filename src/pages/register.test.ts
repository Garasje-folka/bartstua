import React from "react";
import { userManagement } from "../services/index";

/* TODO: Example test, should be removed */
test("just for fun", (done) => {
  userManagement
    .createUserWithEmailAndPassword("heyyyy", "byeeeee")
    .then(() => {
      fail("Skal feile");
    })
    .catch((error) => {
      expect(error).toBe(userManagement.createUserErrors.ERROR_EMAIL_NOT_VALID);
      done();
    });
});
