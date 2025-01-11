import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/base/Button';
import TextInput from '../components/forms/TextInput';
import useInput from '../hooks/useInput';
import SwalToast from '../utils/swal-toast';
import withReactContent from 'sweetalert2-react-content';
import { register } from '../utils/remote-api';
import { useContext, useState } from 'react';
import AuthHeader from '../components/auth/AuthHeader';
import LocaleContext from '../contexts/LocaleContext';

function RegisterPage() {
  const [name, changeName] = useInput('');
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const [passwordConfirmation, changePasswordConfirmation] = useInput('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const { locale } = useContext(LocaleContext);
  const swalAlert = withReactContent(SwalToast);
  const navigate = useNavigate();

  const onRegister = async (event) => {
    event.preventDefault();
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      passwordConfirmation === ''
    ) {
      swalAlert.fire({
        title: locale === 'en' ? 'Fill all inputs' : 'Isi semua input',
        icon: 'warning',
      });
      return;
    }

    if (passwordConfirmation !== password) {
      swalAlert.fire({
        title:
          locale === 'en' ? 'Passwords are not same' : 'Kata sandi tidak sama',
        icon: 'warning',
      });
      return;
    }

    if (password.length < 6) {
      swalAlert.fire({
        title:
          locale === 'en'
            ? 'Minimum password character are 6'
            : 'Minimal karakter password adalah 6',
        icon: 'warning',
      });
      return;
    }

    setButtonLoading(true);
    const { error, data } = await register({ name, email, password });

    if (!error) {
      setButtonLoading(false);
      swalAlert.fire({
        title:
          locale === 'id'
            ? 'Berhasil mendafarkan akun'
            : 'Successfully register an account',
        icon: 'success',
      });
      navigate('/');
    } else {
      setButtonLoading(false);
      swalAlert.fire({ title: data.message, icon: 'error' });
      return;
    }
  };

  return (
    <div className="login-page">
      <div className="auth-card">
        <AuthHeader>
          <h1 style={{ marginTop: '0.5rem' }}>
            {locale === 'id'
              ? 'Daftarkan Dirimu di Write It'
              : 'Register Yourself in Write It'}
          </h1>
          <p>
            {locale === 'id'
              ? 'Masukan informasi yang benar'
              : 'Fill the information correctly'}
          </p>
          <p className="auth-card__header-bottom">
            {locale === 'id' ? 'Sudah memiliki akun?' : 'Already have account?'}{' '}
            <Link to={'/'}>
              <u>{locale === 'id' ? 'Masuk' : 'Login'}</u>
            </Link>
          </p>
        </AuthHeader>
        <div className="auth-card__body">
          <form onSubmit={onRegister} className="auth-form">
            <TextInput
              label={locale === 'id' ? 'Nama' : 'Name'}
              type={'text'}
              value={name}
              onChange={changeName}
            />
            <TextInput
              label={'Email'}
              type={'email'}
              value={email}
              onChange={changeEmail}
            />
            <TextInput
              label={locale === 'id' ? 'Kata sandi' : 'Password'}
              type={'password'}
              value={password}
              onChange={changePassword}
            />
            <TextInput
              label={
                locale === 'id'
                  ? 'Konfirmasi kata sandi'
                  : 'Password confirmation'
              }
              type={'password'}
              value={passwordConfirmation}
              onChange={changePasswordConfirmation}
            />
            <Button
              className="app-button"
              type={'submit'}
              title={locale === 'id' ? 'Daftar' : 'Register'}
              isLoading={buttonLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
