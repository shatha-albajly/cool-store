const FormInput = ({ label, name, type, defaultValue, size, register, validation, error }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name} className='label'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={label}
        defaultValue={defaultValue}
        className={`input input-bordered w-full  ${size}`}
        if {...register(name, validation)}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}


    </div>
  );
};
export default FormInput;
