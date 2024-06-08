import React from "react";

const ThumbnailUpload = ({ label, name, mainImage, setMainImage, error }) => {
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setMainImage(file);
        }

    };
    return <>
        <div className='form-control'>
            <label htmlFor={name} className='label'>
                <span className='label-text capitalize'>{label}</span>
            </label>
            <input type="file" className="file-input-primary file-input input-bordered w-full" onChange={handleMainImageChange} accept="image/*" />
            {mainImage && <img className="object-cover w-[72px] h-[72px] mt-3" src={URL.createObjectURL(mainImage)} alt="Main" />}
        </div>

        {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
    </>;

};

export default ThumbnailUpload;
