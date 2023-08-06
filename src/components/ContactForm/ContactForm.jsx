import React from 'react';
import PropTypes from 'prop-types'; // імпорт PropTypes для документування призначених типів властивостей, що передаються компонентам
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  FormContainer,
  Label,
  Input,
  Button,
  Error,
} from './ContactForm.styled'; // імпорт стилів тегів form (FormContainer), label (Label), input (Input), button (Button)

const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/; // регулярний вираз для імені
const numberRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/; // регулярний вираз для номера телефону

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(nameRegex, 'Name is not valid!')
    .trim()
    .required('Required!'),
  number: Yup.string()
    .min(7, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(numberRegex, 'Phone number is not valid!')
    .trim()
    .required('Required!'),
}); // валідація полів форми

const INITIAL_STATE = {
  name: '',
  number: '',
}; // ініціалізація полів форми

export const ContactForm = ({ onSubmit }) => {
  
  const formSubmit = e => {    
    onSubmit(e);    
    e.name = '';
    e.number = '';
  }; // виклик функції formSubmit призводить до передачі батьківському елементу значень полів name, number

  return (
    <Formik
      initialValues={INITIAL_STATE}
      validationSchema={schema}
      onSubmit={formSubmit}
    >
      <FormContainer>
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <Error name="name" component="p" />
        </Label>
        <Label htmlFor="number">
          Number
          <Input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <Error name="number" component="p" />
        </Label>
        <Button type="submit">Add contact</Button>
      </FormContainer>
    </Formik>
  ); // при настанні події onSubmit викликається функція formSubmit
}; // повернення для рендеру розмітки форми (теги Label і Input для кожного поля форми та тег Button)

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}; // типізація (опис типів) пропсів компоненту класу ContactForm
