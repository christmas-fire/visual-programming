import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './PersonForm.css'; // Add styles later

// Validation Schema using Yup
const personValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  pets: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Pet name is required'),
      age: Yup.number()
        .required('Pet age is required')
        .positive('Pet age must be positive')
        .integer('Pet age must be an integer'),
    })
  )
  // Optionally add min/max validation for the pets array
  // .min(1, 'At least one pet is required')
});

// Initial values for the form
const initialValues = {
  name: '',
  age: '',
  email: '',
  pets: [{ name: '', age: '' }], // Start with one empty pet entry
};

const PersonForm = ({ onAddPerson }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={personValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // Process values before adding (e.g., ensure numbers are numbers)
        const processedValues = {
          ...values,
          age: Number(values.age),
          pets: values.pets.map(pet => ({
            ...pet,
            age: Number(pet.age)
          }))
        };
        onAddPerson(processedValues);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="person-form">
          <h2>Add New Person</h2>

          {/* Person Fields */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`} />
            <ErrorMessage name="name" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <Field name="age" type="number" className={`form-control ${touched.age && errors.age ? 'is-invalid' : ''}`} />
            <ErrorMessage name="age" component="div" className="invalid-feedback" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`} />
            <ErrorMessage name="email" component="div" className="invalid-feedback" />
          </div>

          {/* Pets Section using FieldArray */}
          <FieldArray name="pets">
            {({ insert, remove, push }) => (
              <div className="pets-array-section">
                <h3>Pets</h3>
                {values.pets.length > 0 &&
                  values.pets.map((pet, index) => (
                    <div className="pet-entry" key={index}>
                      <div className="form-group inline-group">
                        <label htmlFor={`pets.${index}.name`}>Pet Name</label>
                        <Field
                          name={`pets.${index}.name`}
                          type="text"
                          className={`form-control ${
                            touched.pets?.[index]?.name && errors.pets?.[index]?.name ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name={`pets.${index}.name`} component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group inline-group">
                        <label htmlFor={`pets.${index}.age`}>Pet Age</label>
                        <Field
                          name={`pets.${index}.age`}
                          type="number"
                           className={`form-control ${
                            touched.pets?.[index]?.age && errors.pets?.[index]?.age ? 'is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name={`pets.${index}.age`} component="div" className="invalid-feedback" />
                      </div>
                       <button
                        type="button"
                        className="secondary remove-pet-button"
                        onClick={() => remove(index)} // remove a pet from the list
                      >
                        Remove Pet
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary add-pet-button"
                  onClick={() => push({ name: '', age: '' })} // add a new pet object to the list
                >
                  Add Pet
                </button>
              </div>
            )}
          </FieldArray>

          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? 'Submitting...' : 'Add Person'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PersonForm; 