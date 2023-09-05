import React, { useState, useEffect } from "react";

type FormValues = {
  name: string;
  email: string;
  agreeTerms: boolean;
  gender: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  agreeTerms: false,
  gender: "",
};

const MyFormComponent = () => {
  const [form, setForm] = useState<FormValues>(initialValues);

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prevForm) => ({
      ...prevForm,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform some action here, such as sending the form data to an API

    console.log(form);
  };

  useEffect(() => {
    let newErrors: FormErrors = {};

    if (form.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";

    if (!form.email.includes("@")) newErrors.email = "Email must be valid.";

    if (!form.agreeTerms) newErrors.agreeTerms = "You must agree to the terms.";

    if (!form.gender) newErrors.gender = "You must select a gender.";

    setErrors(newErrors);
  }, [form]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      {errors.name && <p>{errors.name}</p>}
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        type="checkbox"
        name="agreeTerms"
        data-testid="agree-terms-checkbox"
        checked={form.agreeTerms}
        onChange={handleChange}
      />{" "}
      Agree to Terms
      {errors.agreeTerms && <p>{errors.agreeTerms}</p>}
      <input
        type="radio"
        name="gender"
        data-testid="gender-male-radio-option"
        value="male"
        checked={form.gender === "male"}
        onChange={handleChange}
      />{" "}
      Male
      <input
        type="radio"
        name="gender"
        data-testid="gender-female-radio-option"
        value="female"
        checked={form.gender === "female"}
        onChange={handleChange}
      />{" "}
      Female
      {errors.gender && <p>{errors.gender}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyFormComponent;
