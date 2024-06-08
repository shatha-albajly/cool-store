import React, { useState } from 'react';

const TagsInput = ({ tags, setTags, label, name, register, validation, error }) => {
  const [newTag, setNewTag] = useState('');

  const addTag = (e) => {
    e.preventDefault();
    if (newTag.trim() !== '' && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div >
      <div className="form-control w-full  ">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <div key={index} className=" flex justify-center items-center badge badge-lg badge-outline badge-primary">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 btn btn-ghost  btn-xs "
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div className='flex justify-between items-center gap-x-2'>

          <input
            name={name}
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            className="input input-bordered  w-full"
          />
          <button onClick={addTag} type="button" className="btn btn-md btn-primary ">
            Add Tag
          </button>

        </div>
        {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}

      </div>
    </div >
  );
};

export default TagsInput;
