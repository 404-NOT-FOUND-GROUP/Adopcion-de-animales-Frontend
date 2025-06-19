import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../UI/Input'; // Asegúrate de tener este componente Input en tu proyecto.
import { validateEmail, validatePassword, validateUsername, validatePhone, validatePasswordConfirm } from '../../shared/validators';
import { useRegister } from '../../shared/hooks/useRegister';
import toast from 'react-hot-toast';

export const Register = ({ switchAuthHandler }) => {
  const { register, isLoading } = useRegister();
  
  const [form, setForm] = useState({
    nombre: { value: '', isValid: false, showError: false },
    apellido: { value: '', isValid: false, showError: false },
    username: { value: '', isValid: false, showError: false },
    email: { value: '', isValid: false, showError: false },
    phone: { value: '', isValid: false, showError: false },
    password: { value: '', isValid: false, showError: false },
    passwordConf: { value: '', isValid: false, showError: false },
    role: { value: 'USER_ROLE', isValid: true, showError: false }
  });

  const handleChange = (val, field) => {
    setForm(prev => ({ ...prev, [field]: { ...prev[field], value: val } }));
  };

  const handleBlur = (val, field) => {
    let valid = false;
    switch (field) {
      case 'nombre':
      case 'apellido':
        valid = val.trim().length > 0;
        break;
      case 'username':
        valid = validateUsername(val);
        break;
      case 'email':
        valid = validateEmail(val);
        break;
      case 'phone':
        valid = validatePhone(val);
        break;
      case 'password':
        valid = validatePassword(val);
        break;
      case 'passwordConf':
        valid = validatePasswordConfirm(form.password.value, val);
        break;
      default:
        valid = true;
    }
    setForm(prev => ({
      ...prev,
      [field]: { ...prev[field], isValid: valid, showError: !valid },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      nombre: form.nombre.value.trim(),
      apellido: form.apellido.value.trim(),
      username: form.username.value.trim(),
      email: form.email.value.trim().toLowerCase(),
      phone: form.phone.value.trim(),
      password: form.password.value,
      role: form.role.value
    };

    register(userData);  // Llamar al hook para realizar el registro
  };

  const allValid = form.nombre.isValid && form.apellido.isValid && form.username.isValid && form.email.isValid && form.phone.isValid && form.password.isValid && form.passwordConf.isValid;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <Input
            field="nombre"
            label="Nombre"
            type="text"
            value={form.nombre.value}
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            showErrorMessage={form.nombre.showError}
            validationMessage="El nombre es obligatorio."
            inputClass="form-control"
          />
        </div>
        <div className="col-12 col-md-6">
          <Input
            field="apellido"
            label="Apellido"
            type="text"
            value={form.apellido.value}
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            showErrorMessage={form.apellido.showError}
            validationMessage="El apellido es obligatorio."
            inputClass="form-control"
          />
        </div>
      </div>

      <div className="mt-3">
        <Input
          field="username"
          label="Usuario"
          type="text"
          value={form.username.value}
          onChangeHandler={handleChange}
          onBlurHandler={handleBlur}
          showErrorMessage={form.username.showError}
          validationMessage="El usuario es obligatorio."
          inputClass="form-control"
        />
      </div>

      <div className="mt-3">
        <Input
          field="email"
          label="Correo Electrónico"
          type="email"
          value={form.email.value}
          onChangeHandler={handleChange}
          onBlurHandler={handleBlur}
          showErrorMessage={form.email.showError}
          validationMessage="El correo electrónico es obligatorio."
          inputClass="form-control"
        />
      </div>

      <div className="mt-3">
        <Input
          field="phone"
          label="Teléfono"
          type="tel"
          value={form.phone.value}
          onChangeHandler={handleChange}
          onBlurHandler={handleBlur}
          showErrorMessage={form.phone.showError}
          validationMessage="El teléfono es obligatorio."
          inputClass="form-control"
        />
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12 col-md-6">
          <Input
            field="password"
            label="Contraseña"
            type="password"
            value={form.password.value}
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            showErrorMessage={form.password.showError}
            validationMessage="La contraseña debe tener al menos 8 caracteres."
            inputClass="form-control"
          />
        </div>
        <div className="col-12 col-md-6">
          <Input
            field="passwordConf"
            label="Confirmar Contraseña"
            type="password"
            value={form.passwordConf.value}
            onChangeHandler={handleChange}
            onBlurHandler={handleBlur}
            showErrorMessage={form.passwordConf.showError}
            validationMessage="Las contraseñas no coinciden."
            inputClass="form-control"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!allValid || isLoading}
        className={`btn btn-primary w-100 mt-4${(!allValid || isLoading) ? ' disabled' : ''}`}
      >
        {isLoading ? 'Registrando...' : 'Crear Cuenta'}
      </button>
    </form>
  );
};

Register.propTypes = {
  switchAuthHandler: PropTypes.func.isRequired,
};
