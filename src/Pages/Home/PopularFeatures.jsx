import React from "react";
import img1 from "../../assets/live-tracking.png";
import img2 from "../../assets/safe-delivery.png"; // Replace with your actual image path 

const features = [
    {
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: img1,
    },
    {
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: img2,
    },
    {
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: img2,
    },
];

const PopularFeatures = () => {

    return (
        <section data-aos="zoom-in-up" data-aos-anchor-placement="top-bottom"
         className="bg-base-100 py-12 px-4 max-w-11/12 mx-auto my-6 rounded-3xl">

            <div className="w-full border-b-2 border-dashed border-black my-6"></div>

            <div className="max-w-7xl mx-auto py-10 px-4 md:px-12 bg-base-100 space-y-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center bg-white dark:bg-base-200 rounded-xl shadow-md p-6 gap-6"
                    >
                        <div className="w-28 h-28 md:w-32 md:h-32 shrink-0">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Vertical Dashed Divider */}
                        <div className="mx-6 border-l-2 border-dashed border-black h-24 hidden sm:block"></div>

                        <div>
                            <h3 className="text-lg font-bold text-base-content">{feature.title}</h3>
                            <p className="text-sm text-base-content opacity-80 mt-2">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full border-b-2 border-dashed border-black my-6"></div>


        </section>
    );
};

export default PopularFeatures;
