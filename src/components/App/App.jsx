import React from 'react';
import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container, Box, TopTitle, Title } from './App.stiled.jsx'; // імпорт стилів тегів div (Container), div (Box), h1 (TopTitle), h2 (Title)

const inatialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]; // об'єкт з даними по замовчуванню

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('phonebook_contacts')) ?? // читаємо з localStorage список контактів та розпарсимо його
      inatialContacts //  інакше берем значення по замовчуванню
  ); // виклик хука useState створює стан contacts і метод setContacts, який змінює його значення

  const [filter, setFilter] = useState(''); // виклик хука useState створює стан filter і метод setFilter, який змінює його значення

  useEffect(() => {
    localStorage.setItem('phonebook_contacts', JSON.stringify(contacts));
  }, [contacts]); // виклик хука useEffect, при зміні стану contacts, призводить до запису в localStorage нового списку, перетвореного в JSON формат

  const formChange = e => {
    setFilter(e.target.value); // стану filter присвоюється значення value поля вводу "Find contacts by name"
  }; // метод formChange класу App, виклик методу призводить до оновлення об'єкту-стану state в полі (name), яке було ініціатором цієї події

  const addContact = contact => {
    if (
      contacts.find(
        item =>
          item.name.toLowerCase().replaceAll(' ', '') ===
          contact.name.toLowerCase().replaceAll(' ', '')
      ) // при порівнянні приводимо до нижнього регістру та видаляємо пробіли, для унеможливлення реєстрації однакових імен з додатковими пробілами
    ) {
      return Notiflix.Notify.warning(
        `Name ${contact.name} is already in contacts`
      ); // якщо в списку контактів існує контакт з таким ім'ям, вийти та вивести відповідне повідомлення
    } else if (
      contacts.find(
        item =>
          item.number
            .replaceAll('+', '')
            .replaceAll(' ', '')
            .replaceAll('(', '')
            .replaceAll(')', '')
            .replaceAll('-', '') ===
          contact.number
            .replaceAll('+', '')
            .replaceAll(' ', '')
            .replaceAll('(', '')
            .replaceAll(')', '')
            .replaceAll('-', '')
      ) // при порівнянні видаляємо плюс, пробіли, дужки та тире, якщо вони є, для унеможливлення реєстрації однакових номерів з додатковими символами
    ) {
      return Notiflix.Notify.warning(
        `Number ${contact.number} is already in contacts`
      ); // якщо в списку контактів існує контакт з таким номером телефону, вийти та вивести відповідне повідомлення
    }

    setContacts(previousState => [
      ...previousState,
      {
        id: nanoid(),
        ...contact,
      },
    ]); // інакше, додати цей новий контакт (id та розпилений масив нового контакту) до стану контактів contacts
  }; // функція addContact класу App додає новий контакт в масив контактів та новий масив контактів записується до стану контактів contacts

  const filterContacts = () =>
    filter === ''
      ? contacts
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );
  // функція filterContacts класу App; якщо поле фільтра порожнє, повертає повний список контактів, інакше повертає відфільтровний список контактів

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  }; // функція onDeleteContact класу App видаляє відфільтрований по id контакт з масиву контактів та новий масив контактів записується до стану контактів contacts

  const filteredContacts = filterContacts(); // масив відфільтрованих контактів

  return (
    <Container>
      <Box>
        <TopTitle>Phonebook</TopTitle>
        <ContactForm onSubmit={addContact} />
        <Title>Contacts</Title>
        <Filter filter={filter} changedFormData={formChange} />
        <ContactList
          apdatedContacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </Box>
    </Container>
  ); // повернення для рендеру розмітки застосунку "Книга контактів"
}; // клас App(), повертає компоненти з даними для рендеру сторінки
