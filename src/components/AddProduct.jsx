import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { toast } from 'react-toastify';
import FormTextArea from './FormTextArea';
import FormSelect from './FormSelect';
import TagsInput from './TagsInput';
import { useState, useEffect } from 'react';
import ThumbnailUpload from './ThumbnailUpload';
import ImagesUpload from './ImagesUpload';
import { customFetch } from '../utils';

const AddProduct = () => {
    const [tags, setTags] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);

    const categories = [
        "beauty",
        "fragrances",
        "furniture",
        "groceries",
        "home-decoration",
        "kitchen-accessories",
        "laptops",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "mobile-accessories",
        "motorcycle",
        "skin-care",
        "smartphones",
        "sports-accessories",
        "sunglasses",
        "tablets",
        "tops",
        "vehicle",
        "womens-bags",
        "womens-dresses",
        "womens-jewellery",
        "womens-shoes",
        "womens-watches"
    ];

    const { register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (additionalImages.length === 0) {
            setAdditionalImages([mainImage]);
        }

        const payload = {
            ...data,
            "tags": tags,
            "mainImage": mainImage,
            "additionalImages": additionalImages
        };

        try {
            const response = await customFetch.post('/products/add', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data);
            toast.success('Product added successfully');
            resetForm();
        } catch (error) {
            console.log(error);
            toast.error('Failed to add product');
        }
    };

    const handleFormSubmit = (data) => {

        if (!mainImage) {
            setError('mainImage', {
                type: 'manual',
                message: 'Please select a main image',
            });
        }

        if (tags.length === 0) {
            setError('tags', {
                type: 'manual',
                message: 'Enter at least one tag',
            });
        }

        if (mainImage && tags.length > 0) {
            clearErrors(['mainImage', 'tags']);
            onSubmit(data);
        }
    };

    useEffect(() => {
        if (tags.length > 0) clearErrors('tags');
        if (mainImage) clearErrors('mainImage');
    }, [tags, mainImage, clearErrors]);

    const resetForm = () => {
        reset();
        setTags([]);
        setMainImage(null);
        setAdditionalImages([]);
    };

    return (
        <Form onSubmit={handleSubmit(handleFormSubmit)} method='post' className='shadow-md border rounded-lg p-5 gap-y-4 max-w-5xl mx-auto'>
            <h4 className='font-medium text-xl capitalize'>Add Product</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormInput
                    label='Enter ID'
                    name='id'
                    type='number'
                    register={register}
                    validation={{
                        required: 'ID is required',
                        validate: value => value > 0 || 'ID must be a positive number'
                    }}
                    error={errors.id}
                />
                <FormInput
                    label='Enter Title'
                    name='title'
                    type='text'
                    register={register}
                    validation={{
                        required: 'Title is required',
                        minLength: { value: 5, message: 'Title must be at least 5 characters' }
                    }}
                    error={errors.title}
                />
                <FormSelect
                    label='Choose Category'
                    name='category'
                    list={categories}
                    defaultValue='electronics'
                    register={register}
                    validation={{ required: 'Category is required' }}
                    error={errors.category}
                />
                <FormInput
                    label='Enter Price'
                    name='price'
                    type='number'
                    register={register}
                    validation={{
                        required: 'Price is required',
                        validate: value => value > 0 || 'Price must be a positive number'
                    }}
                    error={errors.price}
                />
                <FormInput
                    label='Enter Discount Percentage'
                    name='discount'
                    type='number'
                    register={register}
                    validation={{
                        required: 'Discount is required',
                        validate: value => value > 0 || 'Discount must be a positive number'
                    }}
                    error={errors.discount}
                />
                <FormInput
                    label='Enter how many on stock'
                    name='stock'
                    type='number'
                    register={register}
                    validation={{
                        required: 'Stock number is required',
                        validate: value => value >= 0 || 'Stock must be a positive number'
                    }}
                    error={errors.stock}
                />
                <FormInput
                    label='Enter brand'
                    name='brand'
                    type='text'
                    register={register}
                    validation={{
                        required: 'Brand is required',
                        minLength: { value: 3, message: 'Brand must be at least 3 characters' }
                    }}
                    error={errors.brand}
                />
            </div>
            <div className='my-4'>
                <FormTextArea
                    label='Enter Description'
                    name='description'
                    type='textarea'
                    register={register}
                    validation={{
                        required: 'Description is required',
                        minLength: { value: 20, message: 'Description must be at least 20 characters' },
                        maxLength: { value: 100, message: 'Description must be at most 100 characters' }
                    }}
                    error={errors.description}
                />
            </div>
            <TagsInput
                tags={tags}
                name='tags'
                label='Enter Tags'
                setTags={setTags}
                register={register}
                validation={{
                    required: 'Enter at least one tag',
                }}
                error={errors.tags}
            />
            <div className='mt-4'>
                <ThumbnailUpload
                    mainImage={mainImage}
                    setMainImage={setMainImage}
                    name='mainImage'
                    label='Main Image'
                    error={errors.mainImage}
                    setError={setError}
                    clearErrors={clearErrors}
                />
            </div>
            <div className='mt-4'>
                <ImagesUpload
                    additionalImages={additionalImages}
                    setAdditionalImages={setAdditionalImages}
                    name='additionalImages'
                    label='Additional Images (Optional)'
                    error={errors.additionalImages}
                    setError={setError}
                    clearErrors={clearErrors}
                />
            </div>
            <div className='mx-auto mt-4 max-w-sm'>
                <SubmitBtn text='Add Product' />
            </div>
        </Form>
    );
};

export default AddProduct;
