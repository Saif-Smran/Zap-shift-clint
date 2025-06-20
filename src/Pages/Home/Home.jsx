import React from 'react';
import Slider from './Slider';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import TrustedBy from './TrustedBy';
import PopularFeatures from './PopularFeatures';
import BecomeMerchant from './BecomeMerchant';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <TrustedBy></TrustedBy>
            <PopularFeatures></PopularFeatures>
            <BecomeMerchant></BecomeMerchant>
        </div>
    );
};

export default Home;