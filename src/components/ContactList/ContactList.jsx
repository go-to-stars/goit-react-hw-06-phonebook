import { useDispatch, useSelector } from 'react-redux';
import { getContacts, deleteContact } from '../../redux/contactsSlice';
import { getFilter } from '../../redux/filterSlice';
import { List, ListItem, Text, Button } from './ContactList.styled'; // імпорт стилів тегів ul(List), li(ListItem), p(Text), Button

export const ContactList = () => {
  const contacts = useSelector(getContacts); // виклик хука useSelector дозволяє витягувати дані зі стану сховища Redux за допомогою функції селектора getContacts
  const filter = useSelector(getFilter); // виклик хука useSelector дозволяє витягувати дані зі стану сховища Redux за допомогою функції селектора getFilter
  const dispatch = useDispatch(); //виклик хука useDispatch повертає посилання на dispatch функцію зі сховища Redux, для відправки action за потреби

  const filterContacts = () =>
    filter === ''
      ? contacts
      : contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        );
  // функція filterContacts повертає повний список контактів, якщо поле фільтра порожнє, інакше повертає відфільтровний список контактів, приведений до нижнього регістру

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  }; // функція onDeleteContact видаляє по id контакт з stor

  const filteredContacts = filterContacts(); // масив відфільтрованих контактів

  return (
    <List>
      {filteredContacts.map(item => (
        <ListItem key={item.id}>
          <Text>
            &#8226; {item.name}: {item.number}
          </Text>
          <Button type="button" onClick={() => onDeleteContact(item.id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List> // створення списку елементів ul методом (map) перебору масиву filteredContacts; при настанні події onClick викликається функція onDeleteContact
  );
}; // повернення розмітки списку контактів компонента ContactList
