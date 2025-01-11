import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/base/Button';
import TextInput from '../components/forms/TextInput';
import useInput from '../hooks/useInput';
import SwalToast from '../utils/swal-toast';
import withReactContent from 'sweetalert2-react-content';
import { register } from '../utils/remote-api';
import { useState } from 'react';

function RegisterPage() {
  const [name, changeName] = useInput('');
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const [passwordConfirmation, changePasswordConfirmation] = useInput('');
  const [buttonLoading, setButtonLoading] = useState(false);
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
      swalAlert.fire({ title: 'Fill all inputs', icon: 'warning' });
      return;
    }

    if (passwordConfirmation !== password) {
      swalAlert.fire({ title: 'Passwords are not same', icon: 'warning' });
      return;
    }

    if (password.length < 6) {
      swalAlert.fire({
        title: 'Minimum password character are 6',
        icon: 'warning',
      });
      return;
    }

    setButtonLoading(true);
    const { error, data } = await register({ name, email, password });

    if (!error) {
      setButtonLoading(false);
      swalAlert.fire({ title: 'Berhasil mendafarkan akun', icon: 'success' });
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
        <div className="auth-card__header">
          <h1>Daftarkan Dirimu di Write It</h1>
          <p>Masukan informasi yang benar</p>
          <p className="auth-card__header-bottom">
            Sudah memiliki akun?{' '}
            <Link to={'/'}>
              <u>Login Akun</u>
            </Link>
          </p>
        </div>
        <div className="auth-card__body">
          <form onSubmit={onRegister} className="auth-form">
            <TextInput
              label={'Nama'}
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
              label={'Password'}
              type={'password'}
              value={password}
              onChange={changePassword}
            />
            <TextInput
              label={'Confirmation Password'}
              type={'password'}
              value={passwordConfirmation}
              onChange={changePasswordConfirmation}
            />
            <Button
              className="app-button"
              type={'submit'}
              title={'Login'}
              isLoading={buttonLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
