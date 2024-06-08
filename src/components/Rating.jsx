import React from "react";

const Rating = ({ rating }) => {

    return <div className="rating  rating-half">
        {[...Array(5).keys()].map((index) => {
            const number = index + 0.5;
            if (rating >= number) {
                return <>
                    <input readOnly type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                    <input readOnly type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-2" />
                </>
            }
            else if (rating > index && rating < number) {
                return <><input readOnly type="radio" name="rating-10" className="bg-yellow-500 mask mask-star-2 mask-half-1" />
                    <input readOnly type="radio" name="rating-10" className="bg-yellow-200 mask mask-star-2 mask-half-2" />
                </>
            }
            else {
                return <>
                    <input readOnly type="radio" name="rating-10" className="bg-yellow-200 mask mask-star-2 mask-half-1" />
                    <input readOnly type="radio" name="rating-10" className="bg-yellow-200 mask mask-star-2 mask-half-2" />
                </>
            }


        })}



    </div >
};

export default Rating;
