import React from "react";

const ImagesUpload = ({ label, additionalImages, setAdditionalImages, error, setError, clearErrors }) => {
    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (additionalImages.length + files.length > 4) {
            setError('additionalImages', {
                type: 'manual',
                message: 'You can only upload up to 4 additional images.',
            });
            return;
        }
        clearErrors('additionalImages');
        setAdditionalImages([...additionalImages, ...files]);
    };

    const removeAdditionalImage = (index) => {
        setAdditionalImages(additionalImages.filter((_, i) => i !== index));
    };
    return <>
        <div className='form-control'>
            <label htmlFor={name} className='label'>
                <span className='label-text capitalize'>{label}</span>
            </label>
            <input type="file" multiple className="file-input-primary file-input input-bordered w-full" onChange={handleAdditionalImagesChange} accept="image/*" />
            <div className="flex gap-2">
                {additionalImages.map((image, index) => (
                    <div key={index}>
                        <img className="object-cover w-[72px] h-[72px] mt-3" src={URL.createObjectURL(image)} alt={`Additional ${index}`} />
                        <button type="button" className="btn  btn-error w-[72px] mt-2 " onClick={() => removeAdditionalImage(index)}>Remove</button>
                    </div>
                ))}
            </div>

        </div>

        {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
    </>;

};

export default ImagesUpload;
