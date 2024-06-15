import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react';
import { BASE_URL } from './utilis';

const schema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }).min(1, { message: 'Name is required' }),
  image: z.string({
    required_error: 'Image is required',
  }).min(1, { message: 'Name is required' }).url({ message: "Invalid url" }),
  description: z.string({
    required_error: 'Description is required',
  }).min(1, { message: 'Description is required' }),
  location: z.string({
    required_error: 'Location is required',
  }).min(1, { message: 'Location is required' }),
  rent: z.string({
    required_error: 'Rent/price is required',
  }).min(1, { message: 'Price is required' }),
  housing_unit_type: z.string({
    required_error: 'Housing Type is required',
  }),
})

function AddProperty() {
  const [housing_unit_types, setTypes] = useState([])

  useEffect(()=>{
    fetch(`${BASE_URL}/housing_unit_types`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }

    })
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data)
    }).catch((err)=>console.log(err));
  }, []);

  const { handleSubmit, control, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      image: '',
      description: '',
      location: '',
      rent: '',
      housing_unit_type: ''
    }
  })

  console.log(formState.errors)
  formState.isSubmitting
  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter Name" {...field} />

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}

            </Form.Group>)}
        />
        <Controller
          name="location"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" placeholder="Location" {...field} />

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}

            </Form.Group>)}
        />
        <Controller
          name="rent"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Rent/Price</Form.Label>
              <Form.Control type="number" name="rent" placeholder="Enter rent" {...field} />

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}

            </Form.Group>)}
        />
        <Controller
          name="image"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Image</Form.Label>
              <Form.Control type="url" name="image" placeholder="Image" {...field} />

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}

            </Form.Group>)}
        />
        <Controller
          name="housing_unit_type_id"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Housing Unit Type</Form.Label>
              <Form.Select aria-label="Default select example" {...field}>
                <option>Select Housing Unit Type</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}

            </Form.Group>)}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" placeholder="Description" {...field} />

              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}

            </Form.Group>)}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddProperty;