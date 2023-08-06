import PropTypes from 'prop-types'; // імпорт PropTypes для документування призначених типів властивостей, що передаються компонентам
import { Label, Input } from './Filter.styled'; // імпорт стилів тегів Label, Input

export const Filter = ({ filter, changedFormData }) => (
  <Label>
    Find contacts by name
    <Input
      type="text"
      name="filter"
      value={filter} // значення поля вводу "Find contacts by name" батьківського елемента стану filter
      onChange={changedFormData}
    />
  </Label> // при настанні події onChange викликається функція батьківського елемента changedFormData
); // поверненя розмітки поля filter (теги Label і Input)

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  changedFormData: PropTypes.func.isRequired,
}; // типізація (опис типів) пропсів компоненту Filter
