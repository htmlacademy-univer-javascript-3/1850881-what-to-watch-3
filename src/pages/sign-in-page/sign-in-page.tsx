import {Logo} from '../../components/logo/logo.tsx';
import {Copyright} from '../../components/copyright/copyright.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {FormEvent, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuthStatus} from '../../store/reducers/user-reducer/selector.ts';
import {AuthorizationStatus} from '../../types/authorization-status.ts';
import {AppRoute} from '../../types/app-route.ts';
import {loginAction} from '../../store/api-actions.ts';
import {checkEmail} from '../../utils/checker/check-email.ts';
import {checkPassword} from '../../utils/checker/check-password.ts';

export function SignInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const authStatus = useAppSelector(getAuthStatus);

  const [isEmailNotValid, setIsEmailNotValid] = useState(false);
  const [isPasswordNotValid, setIsPasswordNotValid] = useState(false);
  const [isError, setIsError] = useState(false);

  const checkEmailValidity = (email: string) => {
    const result = checkEmail(email);
    setIsEmailNotValid(!result);
    return result;
  };
  const checkPasswordValidity = (password: string) => {
    const result = checkPassword(password);
    setIsPasswordNotValid(!result);
    return result;
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!(emailRef.current !== null && passwordRef.current !== null
      && checkEmailValidity(emailRef.current.value)
      && checkPasswordValidity(passwordRef.current.value))) {
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const authData = {email: email, password};

    dispatch(loginAction(authData))
      .then(() => {
        if (authStatus === AuthorizationStatus.Auth) {
          navigate(AppRoute.Main);
        }
      })
      .catch(() => setIsError(true));
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo isLight={false}/>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleFormSubmit}>
          {
            isEmailNotValid &&
            <div className="sign-in__message">
              <p>Please enter a valid email address</p>
            </div>
          }
          {
            isPasswordNotValid &&
            <div className="sign-in__message">
              <p>Please enter a valid password</p>
            </div>
          }
          {
            isError &&
            <div className="sign-in__message">
              <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
            </div>
          }
          <div className="sign-in__fields">
            <div className={isEmailNotValid ? 'sign-in__field sign-in__field--error' : 'sign-in__field'}>
              <input className="sign-in__input" ref={emailRef} type="email" placeholder="Email address" name="user-email" id="user-email"/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={isPasswordNotValid ? 'sign-in__field sign-in__field--error' : 'sign-in__field'}>
              <input className="sign-in__input" ref={passwordRef} type="password" placeholder="Password" name="user-password" id="user-password"/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <Logo isLight/>
        <Copyright/>
      </footer>
    </div>
  );
}
