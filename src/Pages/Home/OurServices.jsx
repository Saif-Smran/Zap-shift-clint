import React from 'react';
import {
  FaTruck,
  FaGlobeAsia,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from 'react-icons/fa';

const services = [
  {
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
    icon: <FaTruck className="text-3xl text-primary" />,
  },
  {
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
    icon: <FaGlobeAsia className="text-3xl text-primary" />,
  },
  {
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
    icon: <FaWarehouse className="text-3xl text-primary" />,
  },
  {
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    icon: <FaMoneyBillWave className="text-3xl text-primary" />,
  },
  {
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
    icon: <FaBuilding className="text-3xl text-primary" />,
  },
  {
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    icon: <FaUndoAlt className="text-3xl text-primary" />,
  },
];

const OurServices = () => {
  return (
    <section className="max-w-11/12 mx-auto bg-base-300 py-16 px-4 my-6 rounded-3xl">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
          Our Services
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 space-y-4 shadow-md transition duration-300 ease-in-out cursor-pointer hover:bg-lime-300 hover:text-black bg-base-100 text-base-content"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-lg font-semibold text-center">{service.title}</h3>
              <p className="text-sm text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
