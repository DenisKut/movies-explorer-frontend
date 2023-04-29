import { useState, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChangeValues = (event) => {
    const input = event.target;
    const { value, name } = input;

    if(name === 'name' && input.validity.patternMismatch)
      input.setCustomValidity('Имя должно быть на латинице или кириллице, с использованием пробела/дефиса');
    else
      input.setCustomValidity('');

    if (name === 'email')
      if (!isEmail(value))
        input.setCustomValidity('Неверно введён адрес электронной почты!');
      else
        input.setCustomValidity('');

    setValues({ ...values, [name]: value }); // универсальный обработчик полей
    setErrors({ ...errors, [name]: input.validationMessage }); // ошибок
    setIsValid(input.closest('form').checkValidity()); // проверка валидности
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => { // это метод для сброса формы, полей, ошибок
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChangeValues, resetForm, errors, isValid };
}