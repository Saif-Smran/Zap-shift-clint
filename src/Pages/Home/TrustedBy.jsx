import React from 'react';
import Marquee from 'react-fast-marquee';

// Import your 7 logos
import logo1 from '../../assets/brands/amazon.png';
import logo2 from '../../assets/brands/amazon_vector.png';
import logo3 from '../../assets/brands/casio.png';
import logo4 from '../../assets/brands/moonstar.png';
import logo5 from '../../assets/brands/randstad.png';
import logo6 from '../../assets/brands/start-people 1.png';
import logo7 from '../../assets/brands/start.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const TrustedBy = () => {
  return (
    <section className="bg-base-100 py-10 px-4 max-w-11/12 mx-auto my-6 rounded-3xl">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-base-content">
          We've helped thousands of sales teams
        </h2>

        <Marquee
          speed={50}
          gradient={false}
          pauseOnHover={true}
          className="mt-6"
        >
          {logos.map((logo, index) => (
            <div key={index} className="mx-20">
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className="h-5 object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TrustedBy;
