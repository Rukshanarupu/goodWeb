import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);

    // useEffect(() => {
    //     // const url=`${baseUrl}/user-reviews`
    //     fetch('testimonial.json')
    //     .then((res) => res.json())
    //     .then((data) => setReviews(data))
    //     .catch((error) => console.error(error));
    // }, []);
//   console.log(reviews)

    return (
        <div className="testimonial-section text-white">
            <div className="container">
                <div className="text-center">
                    <h3 className="">Testimonials</h3>
                    <p className="text-muted">We thanks for all our awesome testimonials! There are hundreds of our happy customers! <br/>Let's see what others say about GoodWEB Solutions website template!</p>
                </div>
                <Swiper
                slidesPerView={1}
                spaceBetween={30}
                centeredSlides={false}
                keyboard={{enabled: true}}
                pagination={{clickable: true}}
                modules={[Keyboard, Pagination]}
                className="mySwiper"
                >
                <div className="row">
                {reviews?.map((review) => (
                    <SwiperSlide key={review._id}>
                            <div className="testimonial p-md-5">
                                <div className="testimonial-slider ">
                                    <div className="review bg-secondary px-5 py-4 text-left mb-4">
                                        <h4><FaQuoteLeft className="text-warning"/> {review.review_title}!</h4>
                                        <p className="fst-italic text-black">{review.review_des}</p>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <div>
                                            <img src={review.reviewer_img} alt="" className="img-responsive"/>
                                        </div>
                                        <div className="text-left">
                                            <h4>{review.reviewer_name}</h4>
                                            <p><small>- {review.reviewer_position}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </SwiperSlide>
                ))}
                </div>
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonial;