import React from "react";
import img from '../../assets/be-a-merchant-bg.png'
import img2 from '../../assets/location-merchant.png'

const BecomeMerchant = () => {
    return (
        <section className="max-w-7xl mx-auto my-6 px-10 pb-10">
            <div
                className="bg-[#003C3C] text-white rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 "
                style={{ backgroundImage: `url(${img})`, backgroundRepeat: 'no-repeat'}}
            >

                {/* Text content */}
                <div className="flex-1">
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                        Merchant and Customer Satisfaction <br />
                        is Our First Priority
                    </h2>
                    <p className="mt-4 text-base text-white/80 max-w-xl">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product.
                        Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4">
                        <button className="btn btn-outline text-lime-400 hover:bg-lime-400 hover:text-black font-semibold">
                            Become a Merchant
                        </button>
                        <button className="btn btn-outline text-lime-400 hover:bg-lime-400 hover:text-black font-semibold">
                            Earn with Profast Courier
                        </button>
                    </div>
                </div>

                {/* Illustration image */}
                <div className="flex-1 max-w-sm">
                    <img
                        src={img2}
                        alt="Parcel Illustration"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default BecomeMerchant;
