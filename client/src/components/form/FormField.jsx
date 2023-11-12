const FormField = ({ required, nameLabel, name, type, value, error, handleChange }) => (
    <div className="inputGroup">
    <label htmlFor={name}>{nameLabel} {required && <strong>*</strong>} </label>
      <input id={name} type={type} name={name} onChange={handleChange} value={value} autoComplete="off" />
      {error && <span>{error}</span>}
    </div>
  );

export default FormField;