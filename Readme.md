## Unit tests test project

In the MyFormComponent tests, we thoroughly evaluate the behavior of a React form component that collects user information such as name, email, agreement to terms, and gender. The tests are categorized into two sections: "Positive cases" and "Negative cases."

In the "Positive cases" section, we validate the component's ability to handle a successful form submission when all fields are correctly filled. We cover cases where users provide valid data, including long names and email addresses, and we also test the ability to change the gender selection and resubmit the form. In the "Negative cases" section, we focus on error handling. We simulate scenarios where users leave the "Name" field blank, provide an invalid email address, fail to agree to the terms, or forget to select a gender. Each test checks whether the component correctly displays error messages and prevents form submission with invalid data.

## Running Tests Locally

To run the tests for MyFormComponent locally, follow these steps:

1. Make sure you have Node.js and npm (Node Package Manager) or yarn installed on your system.

2. Clone or download the project's repository to your local machine.

3. Open a terminal or command prompt and navigate to the project directory.

4. Install the project's dependencies by running the following command:

   ```
   npm install
   ```

   ```
   yarn install
   ```

5. Once the dependencies are installed, you can run the tests using the following command:

   ```
   npm test
   ```

   ```
   yarn test
   ```

   This will launch the test runner and execute all the tests defined in the test suite for MyFormComponent.

6. After running the tests, you'll see the test results in your terminal. The output will indicate whether the tests passed or failed and provide details on any errors or failed assertions.

By following these steps, you can easily run the provided tests for MyFormComponent and ensure that the component behaves as expected in various scenarios, both when user input is valid and when it contains errors.
