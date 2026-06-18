'use client';

import { type FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from '@/store/hooks';
import { setToken } from '@/store/sessionSlice';

type LoginErrors = {
  email?: string;
  password?: string;
};

const validateLogin = (email: string, password: string): LoginErrors => {
  const errors: LoginErrors = {};
  const normalizedEmail = email.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    errors.email = 'Введите корректный email';
  }

  if (password.length < 4) {
    errors.password = 'Пароль должен содержать минимум 4 символа';
  }

  return errors;
};

const getApiUrl = (path: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  return apiUrl ? `${apiUrl}${path}` : path;
};

export function LoginForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('demo@inventory.test');
  const [password, setPassword] = useState('inventory');
  const [validationErrors, setValidationErrors] = useState<LoginErrors>({});
  const [error, setError] = useState('');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    const errors = validateLogin(email, password);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const response = await fetch(getApiUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password })
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.message ?? 'Ошибка авторизации');
      return;
    }

    localStorage.setItem('inventory:token', data.token);
    dispatch(setToken(data.token));
  };

  return (
    <Form className="login-form" onSubmit={submit} noValidate>
      <h1>Demo JWT Login</h1>
      <Form.Group controlId="login-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          required
          value={email}
          isInvalid={Boolean(validationErrors.email)}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="login-password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          required
          minLength={4}
          value={password}
          isInvalid={Boolean(validationErrors.password)}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.password}
        </Form.Control.Feedback>
      </Form.Group>
      {error && <p className="login-form__error">{error}</p>}
      <Button type="submit">Получить JWT</Button>
    </Form>
  );
}
