import useFormValidation from '../hooks/useFormValidation';
import { useEffect } from "react";

function Profile() {
  const {
    values,
    handleChangeValues,
    resetForm,
    errors,
    isValid,
  } = useFormValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm])

  function handleSubmit(event) {
    event.preventDefault();
  }

  return(
    <main className="profile">
      <h1 className='profile__title'>
        Привет, Денис!
      </h1>
      <form
        className="profile__form"
        name="profile"
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
      >
        <label className='profile__label'>
          <span className='profile__label-text' id="name">Имя</span>
          <input
            className={`profile__input ${errors.name && 'profile__input_error'}`}
            name='name'
            onChange={handleChangeValues}
            value={values.name || 'Денис'}
            required
            minLength='2'
            maxLength='30'
            type='text'
          />
          <span className='profile__error'>
            {errors.name || ''}
          </span>
        </label>

        <label className='profile__label'>
          <span className='profile__label-text' id="email">E-mail</span>
          <input
            className={`profile__input ${errors.email && 'profile__input_error'}`}
            name='email'
            onChange={handleChangeValues}
            value={values.email || 'dencha@yandex.by'}
            required
            type='email'
          />
          <span className='profile__email-error'>
            {errors.email || ''}
          </span>
        </label>
        <button
          className={
            `profile__button-edit ${
              !isValid && 'profile__button-edit_disabled'
            }`}
          type='submit'
          disabled={!isValid}
        >
          Редактировать
        </button>
        <button type="submit" className="profile__button-exit">
            Выйти из аккаунта
          </button>
      </form>
    </main>
  )
}

export default Profile;