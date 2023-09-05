import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import MyFormComponent from ".";

describe("testing MyFormComponent component", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    cleanup();
  });

  describe("Positive cases", () => {
    it("should submit the form with all fields filled in correctly", async () => {
      render(<MyFormComponent />);

      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const agreeTermsCheckbox = screen.getByTestId("agree-terms-checkbox");
      const maleGenderRadio = screen.getByTestId("gender-male-radio-option");

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(agreeTermsCheckbox);
      fireEvent.click(maleGenderRadio);

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        agreeTerms: true,
        gender: "male",
      });

      expect(
        screen.queryByText("Name must be at least 3 characters.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Email must be valid.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must agree to the terms.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must select a gender.")
      ).not.toBeInTheDocument();
    });

    it("should submit the form with a very long valid name", async () => {
      render(<MyFormComponent />);

      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const agreeTermsCheckbox = screen.getByTestId("agree-terms-checkbox");
      const maleGenderRadio = screen.getByTestId("gender-male-radio-option");

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.click(agreeTermsCheckbox);
      fireEvent.click(maleGenderRadio);

      fireEvent.change(emailInput, {
        target: { value: "test.name+super.complicaed@example.com.ua" },
      });

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(console.log).toHaveBeenCalledWith({
        name: "John Doe",
        email: "test.name+super.complicaed@example.com.ua",
        agreeTerms: true,
        gender: "male",
      });

      expect(
        screen.queryByText("Name must be at least 3 characters.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Email must be valid.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must agree to the terms.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must select a gender.")
      ).not.toBeInTheDocument();
    });

    it("should change the gender from male to female and submit the form", async () => {
      render(<MyFormComponent />);

      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const agreeTermsCheckbox = screen.getByTestId("agree-terms-checkbox");
      const maleGenderRadio = screen.getByTestId("gender-male-radio-option");
      const femaleGenderRadio = screen.getByTestId(
        "gender-female-radio-option"
      );

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(agreeTermsCheckbox);
      fireEvent.click(maleGenderRadio);

      fireEvent.click(femaleGenderRadio);

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        agreeTerms: true,
        gender: "female",
      });

      expect(
        screen.queryByText("Name must be at least 3 characters.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Email must be valid.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must agree to the terms.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must select a gender.")
      ).not.toBeInTheDocument();
    });

    it("should re-submit the form after an initial successful submission", async () => {
      render(<MyFormComponent />);

      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const agreeTermsCheckbox = screen.getByTestId("agree-terms-checkbox");
      const maleGenderRadio = screen.getByTestId("gender-male-radio-option");

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(agreeTermsCheckbox);
      fireEvent.click(maleGenderRadio);

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        agreeTerms: true,
        gender: "male",
      });

      expect(
        screen.queryByText("Name must be at least 3 characters.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Email must be valid.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must agree to the terms.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must select a gender.")
      ).not.toBeInTheDocument();

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        agreeTerms: true,
        gender: "male",
      });

      expect(
        screen.queryByText("Name must be at least 3 characters.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Email must be valid.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must agree to the terms.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must select a gender.")
      ).not.toBeInTheDocument();

      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("Negative cases", () => {
    it("should show an error when submitting the form with the 'Name' field left blank", async () => {
      render(<MyFormComponent />);

      const emailInput = screen.getByPlaceholderText("Email");
      const agreeTermsCheckbox = screen.getByTestId("agree-terms-checkbox");
      const maleGenderRadio = screen.getByTestId("gender-male-radio-option");

      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(agreeTermsCheckbox);
      fireEvent.click(maleGenderRadio);

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "",
        email: "john@example.com",
        agreeTerms: true,
        gender: "male",
      });
      expect(
        screen.getByText("Name must be at least 3 characters.")
      ).toBeInTheDocument();

      expect(
        screen.queryByText("Email must be valid.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must agree to the terms.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must select a gender.")
      ).not.toBeInTheDocument();
    });

    it("should show an error when submitting the form with an invalid email address", async () => {
      render(<MyFormComponent />);

      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const agreeTermsCheckbox = screen.getByTestId("agree-terms-checkbox");
      const maleGenderRadio = screen.getByTestId("gender-male-radio-option");

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.click(agreeTermsCheckbox);
      fireEvent.click(maleGenderRadio);

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "John Doe",
        email: "invalid-email",
        agreeTerms: true,
        gender: "male",
      });
      expect(screen.getByText("Email must be valid.")).toBeInTheDocument();

      expect(
        screen.queryByText("Name must be at least 3 characters.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must agree to the terms.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must select a gender.")
      ).not.toBeInTheDocument();
    });

    it("should show an error when submitting the form without checking 'Agree to Terms'", async () => {
      render(<MyFormComponent />);

      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const maleGenderRadio = screen.getByTestId("gender-male-radio-option");

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(maleGenderRadio);

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        agreeTerms: false,
        gender: "male",
      });
      expect(
        screen.getByText("You must agree to the terms.")
      ).toBeInTheDocument();

      expect(
        screen.queryByText("Name must be at least 3 characters.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Email must be valid.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must select a gender.")
      ).not.toBeInTheDocument();
    });

    it("should show an error when submitting the form without selecting a gender", async () => {
      render(<MyFormComponent />);

      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const agreeTermsCheckbox = screen.getByTestId("agree-terms-checkbox");

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(agreeTermsCheckbox);

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        agreeTerms: true,
        gender: "",
      });
      expect(screen.getByText("You must select a gender.")).toBeInTheDocument();

      expect(
        screen.queryByText("Name must be at least 3 characters.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Email must be valid.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must agree to the terms.")
      ).not.toBeInTheDocument();
    });

    it("should show an error when submitting the form with a name less than 3 characters long", async () => {
      render(<MyFormComponent />);

      const nameInput = screen.getByPlaceholderText("Name");
      const emailInput = screen.getByPlaceholderText("Email");
      const agreeTermsCheckbox = screen.getByTestId("agree-terms-checkbox");
      const maleGenderRadio = screen.getByTestId("gender-male-radio-option");

      fireEvent.change(nameInput, { target: { value: "Jo" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.click(agreeTermsCheckbox);
      fireEvent.click(maleGenderRadio);

      fireEvent.submit(screen.getByRole("button", { name: /Submit/i }));

      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "Jo",
        email: "john@example.com",
        agreeTerms: true,
        gender: "male",
      });
      expect(
        screen.getByText("Name must be at least 3 characters.")
      ).toBeInTheDocument();

      expect(
        screen.queryByText("Email must be valid.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must agree to the terms.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("You must select a gender.")
      ).not.toBeInTheDocument();
    });
  });
});
