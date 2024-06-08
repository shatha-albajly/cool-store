const FormSelect = ({ label, name, list, defaultValue, size, register, validation, error }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name} className='label'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        // defaultValue={defaultValue}
        if {...register(name, validation)}
      >
        <option disabled defaultValue>{label}</option>

        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}

    </div>
  );
};
export default FormSelect;
