import { Link } from 'react-router-dom';
import Button from '../components/base/Button';
import TextInput from '../components/forms/TextInput';
import useInput from '../hooks/useInput';
import SwalToast from '../utils/swal-toast';
import withReactContent from 'sweetalert2-react-content';
import { login } from '../utils/remote-api';
import { useState } from 'react';

function LoginPage({ onLoginSuccess }) {
  const [email, changeEmail] = useInput('');
  const [password, changePassword] = useInput('');
  const swalAlert = withReactContent(SwalToast);
  const [buttonLoading, setButtonLoading] = useState(false);

  const onLogin = async (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      swalAlert.fire({ title: 'Fill all inputs', icon: 'warning' });
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
    swalAlert.fire({ title: 'Selamat datang', icon: 'success' });
    onLoginSuccess(data);
  };

  return (
    <div className="login-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1>Selamat Datang di Write It</h1>
          <p>Silahkan masuk dengan akun anda</p>
          <p className="auth-card__header-bottom">
            Belum memiliki akun?{' '}
            <Link to={'/register'}>
              <u>Daftar Akun</u>
            </Link>
          </p>
        </div>
        <div className="auth-card__body">
          <form onSubmit={onLogin} className="auth-form">
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

export default LoginPage;
