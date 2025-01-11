import { Link } from 'react-router-dom';
import Button from '../components/base/Button';
import TextInput from '../components/forms/TextInput';
import useInput from '../hooks/useInput';
import SwalToast from '../utils/swal-toast';
import withReactContent from 'sweetalert2-react-content';
import { login } from '../utils/remote-api';
import { useContext, useState } from 'react';
import AuthHeader from '../components/auth/AuthHeader';
import LocaleContext from '../contexts/LocaleContext';

function LoginPage({ onLoginSuccess }) {
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const swalAlert = withReactContent(SwalToast);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { locale } = useContext(LocaleContext);

  const onLogin = async (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      swalAlert.fire({
        title: locale === 'en' ? 'Fill all inputs' : 'Isi semua input',
        icon: 'warning',
      });
      return;
    }

    setButtonLoading(true);

    const { error, data } = await login({ email, password });

    if (error) {
      setButtonLoading(false);
      swalAlert.fire({ title: data.message, icon: 'error' });
      return;
    }

    setButtonLoading(false);
    swalAlert.fire({
      title:
        locale === 'id' ? 'Selamat Datang di Write It' : 'Welcome to Write It',
      icon: 'success',
    });
    onLoginSuccess(data);
  };

  return (
    <div className="login-page">
      <div className="auth-card">
        <AuthHeader>
          <h1 style={{ marginTop: '0.5rem' }}>
            {locale === 'id'
              ? 'Selamat Datang di Write It'
              : 'Welcome to Write It'}
          </h1>
          <p>
            {locale === 'id'
              ? 'Silahkan masuk dengan akun anda'
              : 'Please login with your account'}
          </p>
          <p className="auth-card__header-bottom">
            {locale === 'id'
              ? 'Belum memiliki akun?'
              : "Don't have an account?"}{' '}
            <Link to={'/register'}>
              <u>{locale === 'id' ? 'Daftar' : 'Register'}</u>
            </Link>
          </p>
        </AuthHeader>
        <div className="auth-card__body">
          <form onSubmit={onLogin} className="auth-form">
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
            <Button
              className="app-button"
              type={'submit'}
              title={locale === 'en' ? 'Login' : 'Masuk'}
              isLoading={buttonLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
