import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm, Controller } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../utilis';

const schema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }).min(1, { message: 'Name is required' }),
  image: z.string({
    required_error: 'Image is required',
  }).min(1, { message: 'Image is required' }).url({ message: "Invalid url" }),
  description: z.string({
    required_error: 'Description is required',
  }).min(1, { message: 'Description is required' }),
  location: z.string({
    required_error: 'Location is required',
  }).min(1, { message: 'Location is required' }),
  rent: z.string({
    required_error: 'Rent/price is required',
  }).min(1, { message: 'Price is required' }),
  housing_unit_type_id: z.string({
    required_error: 'Housing Type is required',
  }).min(1, { message: 'Housing Type is required' }),
});

function AddProperty() {
  const [housing_unit_types, setTypes] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/housing_unit_types`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setTypes(data);
      }).catch((err) => console.log(err));
  }, []);

  const { handleSubmit, control, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      location: '',
      rent: '',
      image: '',
      description: '',
      housing_unit_type_id: ''
    }
  });

  console.log(formState.errors);

  const onSubmit = async (values) => {
    try {
      await fetch(`${BASE_URL}/property_list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...values,
          rent: Number(values.rent),
          housing_unit_type_id: Number(values.housing_unit_type_id)
        }),
      }).then((res) => res.json())
        .then(data => console.log(data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Controller
          name="location"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Location" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Controller
          name="rent"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Rent/Price</Form.Label>
              <Form.Control type="number" placeholder="Enter rent" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Controller
          name="image"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="url" placeholder="Image URL" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Controller
          name="housing_unit_type_id"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Housing Unit Type</Form.Label>
              <Form.Select aria-label="Default select example" {...field}>
                <option>Select Housing Unit Type</option>
                {housing_unit_types.map((housing_unit_type) => (
                  <option key={housing_unit_type.id} value={housing_unit_type.id}>
                    {housing_unit_type.name}
                  </option>
                ))}
              </Form.Select>
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Description" {...field} />
              {fieldState.invalid && (
                <Form.Text className="text-danger">
                  {fieldState.error.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        />
        <Button
          variant="primary"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Saving..." : "Submit"}
        </Button>
      </Form>
    </Container>
  );
}

export default AddProperty;
