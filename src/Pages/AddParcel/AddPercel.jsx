import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
    FaBox,
    FaFileAlt,
    FaUser,
    FaEnvelope,
    FaInfoCircle,
    FaPaperPlane,
    FaSpinner,
    FaCalculator,
    FaCheckCircle
} from 'react-icons/fa';
import warehousesData from '../../assets/Data/warehouses.json';
import divisionsData from '../../assets/Data/division.json';
import axios from 'axios';
import UseAuth from '../../Hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// const instance = axios.create({
//     baseURL: 'http://localhost:3000', // Your Express server
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

const AddParcel = () => {
  const [type, setType] = useState('Document');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [warehouses, setWarehouses] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [senderWarehouses, setSenderWarehouses] = useState([]);
    const [receiverWarehouses, setReceiverWarehouses] = useState([]);
    const { user } = UseAuth();
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
        watch,
        reset,
        // setValue
  } = useForm();

    const watchedSenderRegion = watch('senderRegion');
    const watchedReceiverRegion = watch('receiverRegion');
    // const watchedWeight = watch('parcelWeight');

    // Load data on component mount
    useEffect(() => {
        setWarehouses(warehousesData);
        setDivisions(divisionsData);
    }, []);

    // Filter warehouses based on selected regions
    useEffect(() => {
        if (watchedSenderRegion && watchedSenderRegion !== 'Select your region') {
            const filtered = warehouses.filter(warehouse =>
                warehouse.region === watchedSenderRegion
            );
            setSenderWarehouses(filtered);
        } else {
            setSenderWarehouses([]);
        }
    }, [watchedSenderRegion, warehouses]);

    useEffect(() => {
        if (watchedReceiverRegion && watchedReceiverRegion !== 'Select your region') {
            const filtered = warehouses.filter(warehouse =>
                warehouse.region === watchedReceiverRegion
            );
            setReceiverWarehouses(filtered);
        } else {
            setReceiverWarehouses([]);
        }
    }, [watchedReceiverRegion, warehouses]);

    const calculatePrice = (parcelType, weight, senderRegion, receiverRegion) => {
        const numWeight = parseFloat(weight) || 0;
        const isSameRegion = senderRegion === receiverRegion;
        
        if (parcelType === 'Document') {
            return isSameRegion ? 60 : 80;
        } else {
            // Non-Document
            if (numWeight <= 3) {
                return isSameRegion ? 110 : 150;
            } else {
                const basePrice = isSameRegion ? 110 : 150;
                const extraWeight = numWeight - 3;
                const extraCharge = extraWeight * 40;
                const additionalCharge = isSameRegion ? 0 : 40; // Extra charge for outside city
                return basePrice + extraCharge + additionalCharge;
            }
        }
    };

    const getPriceBreakdown = (parcelType, weight, senderRegion, receiverRegion) => {
        const numWeight = parseFloat(weight) || 0;
        const isSameRegion = senderRegion === receiverRegion;
        
        if (parcelType === 'Document') {
            return {
                basePrice: isSameRegion ? 60 : 80,
                breakdown: [
                    { item: 'Document Delivery', price: isSameRegion ? 60 : 80 }
                ]
            };
        } else {
            // Non-Document
            if (numWeight <= 3) {
                return {
                    basePrice: isSameRegion ? 110 : 150,
                    breakdown: [
                        { item: 'Non-Document (≤3kg)', price: isSameRegion ? 110 : 150 }
                    ]
                };
            } else {
                const basePrice = isSameRegion ? 110 : 150;
                const extraWeight = numWeight - 3;
                const extraCharge = extraWeight * 40;
                const additionalCharge = isSameRegion ? 0 : 40;
                
                const breakdown = [
                    { item: 'Non-Document Base (≤3kg)', price: basePrice },
                    { item: `Extra Weight (${extraWeight.toFixed(1)}kg × ৳40)`, price: extraCharge }
                ];
                
                if (additionalCharge > 0) {
                    breakdown.push({ item: 'Outside City Extra Charge', price: additionalCharge });
                }
                
                return {
                    basePrice: basePrice + extraCharge + additionalCharge,
                    breakdown
                };
            }
        }
    };

    const onSubmit = async (data) => {
        // Calculate pricing
        const totalPrice = calculatePrice(type, data.parcelWeight, data.senderRegion, data.receiverRegion);
        const priceBreakdown = getPriceBreakdown(type, data.parcelWeight, data.senderRegion, data.receiverRegion);
        const isSameRegion = data.senderRegion === data.receiverRegion;
        
        // Create pricing breakdown HTML
        const breakdownHTML = priceBreakdown.breakdown.map(item => 
            `<div class="flex justify-between items-center py-1">
                <span class="text-gray-600">${item.item}</span>
                <span class="font-semibold">৳${item.price}</span>
            </div>`
        ).join('');
        
        // Show pricing confirmation
        const result = await Swal.fire({
            icon: 'info',
            title: 'Pricing Confirmation',
            html: `
                <div class="text-left">
                    <div class="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-bold text-lg mb-2 flex items-center gap-2">
                            <FaCalculator class="text-lime-600" />
                            Pricing Details
                        </h3>
                        <div class="space-y-2">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Parcel Type:</span>
                                <span class="font-semibold">${type}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Weight:</span>
                                <span class="font-semibold">${data.parcelWeight} kg</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Route:</span>
                                <span class="font-semibold">${isSameRegion ? 'Within City' : 'Outside City'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <h4 class="font-semibold mb-2">Price Breakdown:</h4>
                        ${breakdownHTML}
                        <div class="border-t pt-2 mt-2">
                            <div class="flex justify-between items-center font-bold text-lg">
                                <span>Total Price:</span>
                                <span class="text-lime-600">৳${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-sm text-gray-600">
                        <p>• Pickup time: 4:00 PM - 7:00 PM (Approximate)</p>
                        <p>• Delivery time: 24-48 hours within same region</p>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Proceed with Pament',
            cancelButtonText: 'Modify Details',
            width: '500px'
        });

        if (result.isConfirmed) {
            setIsSubmitting(true);
            
            // Generate unique parcel ID
            const parcelId = uuidv4();

            // Add creation time, creator email, and parcelId
            const parcelData = {
                ...data,
                type,
                totalPrice,
                priceBreakdown,
                createdAt: new Date().toISOString(),
                creatorEmail: user?.email || 'unknown',
                parcelId,
                status: 'pending'
            };

            try {
                // Send to backend
                await axios.post('http://localhost:3000/products', parcelData);

                Swal.fire({
                    icon: 'success',
                    title: 'Booking Confirmed!',
                    html: `<div>Your parcel has been successfully booked for ৳${totalPrice}.<br/><br/><b>Parcel ID:</b> <span style='color:#10b981'>${parcelId}</span></div>`,
                    confirmButtonColor: '#10b981',
                    confirmButtonText: 'OK'
                });
                
                reset();
                setType('Document');
            } catch (error) {
                console.error('Error adding parcel:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Booking Failed',
                    text: 'Failed to confirm booking. Please try again.',
                    confirmButtonColor: '#ef4444',
                    confirmButtonText: 'Try Again'
                });
            } finally {
                setIsSubmitting(false);
            }
        }
  };

  return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 py-8">
            <section className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
                {/* Go Back Button */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-lime-600 hover:text-lime-800 font-semibold"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Go Back
                </button>
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Add New Parcel</h2>
                    <p className="text-gray-600">Fill in the details below to schedule your parcel delivery</p>
                </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Type Selection */}
                    <div className="bg-gray-50 p-6 rounded-2xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaBox className="w-5 h-5 text-lime-600" />
                            Parcel Type
          </h3>
          <div className="flex gap-6 items-center">
                            <label className="label cursor-pointer gap-3 bg-white p-4 rounded-xl border-2 hover:border-lime-400 transition-colors">
              <input
                type="radio"
                value="Document"
                {...register('type')}
                checked={type === 'Document'}
                onChange={() => setType('Document')}
                className="radio radio-success"
              />
                                <div>
                                    <span className="label-text font-semibold">Document</span>
                                    <p className="text-xs text-gray-500">Letters, papers, files</p>
                                </div>
            </label>
                            <label className="label cursor-pointer gap-3 bg-white p-4 rounded-xl border-2 hover:border-lime-400 transition-colors">
              <input
                type="radio"
                value="Not-Document"
                {...register('type')}
                checked={type === 'Not-Document'}
                onChange={() => setType('Not-Document')}
                className="radio"
              />
                                <div>
                                    <span className="label-text font-semibold">Package</span>
                                    <p className="text-xs text-gray-500">Items, goods, products</p>
                                </div>
            </label>
          </div>
        </div>

                    {/* Parcel Details */}
                    <div className="bg-gray-50 p-6 rounded-2xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaFileAlt className="w-5 h-5 text-lime-600" />
                            Parcel Information
                        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Parcel Name *</span>
                                </label>
          <input
                                    {...register('parcelName', {
                                        required: 'Parcel name is required',
                                        minLength: { value: 3, message: 'Name must be at least 3 characters' }
                                    })}
                                    placeholder="Enter parcel name"
                                    className={`input input-bordered w-full ${errors.parcelName ? 'input-error' : ''}`}
                                />
                                {errors.parcelName && (
                                    <span className="text-error text-sm mt-1">{errors.parcelName.message}</span>
                                )}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-semibold">Weight (KG) *</span>
                                </label>
          <input
                                    {...register('parcelWeight', { 
                                        required: 'Weight is required',
                                        min: { value: 0.1, message: 'Weight must be at least 0.1 KG' },
                                        max: { value: 100, message: 'Weight cannot exceed 100 KG' }
                                    })}
                                    type="number"
                                    placeholder="0.5"
                                    disabled={type !== 'Not-Document'}
                                    className={`input input-bordered w-full ${errors.parcelWeight ? 'input-error' : ''}`}
                                />
                                {errors.parcelWeight && (
                                    <span className="text-error text-sm mt-1">{errors.parcelWeight.message}</span>
                                )}
                            </div>
                        </div>
        </div>

        {/* Sender & Receiver Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender */}
                        <div className="bg-gray-50 p-6 rounded-2xl">
                            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaUser className="w-5 h-5 text-blue-600" />
                                Sender Details
                            </h4>
          <div className="space-y-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Name *</span>
                                    </label>
                                    <input
                                        {...register('senderName', { required: 'Sender name is required' })}
                                        placeholder="Sender Name"
                                        className={`input input-bordered w-full ${errors.senderName ? 'input-error' : ''}`}
                                    />
                                    {errors.senderName && (
                                        <span className="text-error text-sm mt-1">{errors.senderName.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Region *</span>
                                    </label>
                                    <select
                                        {...register('senderRegion', { required: 'Please select a region' })}
                                        className={`select select-bordered w-full ${errors.senderRegion ? 'select-error' : ''}`}
                                    >
                                        <option value="">Select your region</option>
                                        {divisions.map((division, index) => (
                                            <option key={index} value={division}>{division}</option>
                                        ))}
            </select>
                                    {errors.senderRegion && (
                                        <span className="text-error text-sm mt-1">{errors.senderRegion.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Warehouse</span>
                                    </label>
                                    <select
                                        {...register('senderWarehouse')}
                                        className="select select-bordered w-full"
                                        disabled={!watchedSenderRegion || watchedSenderRegion === 'Select your region'}
                                    >
                                        <option value="">Select Warehouse</option>
                                        {senderWarehouses.map((warehouse, index) => (
                                            <option key={index} value={warehouse.city}>
                                                {warehouse.city} - {warehouse.district}
                                            </option>
                                        ))}
            </select>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Address</span>
                                    </label>
                                    <input
                                        {...register('senderAddress')}
                                        placeholder="Full address"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Contact *</span>
                                    </label>
                                    <input
                                        {...register('senderContact', {
                                            required: 'Contact number is required',
                                            pattern: {
                                                value: /^(\+880|880|0)?1[3-9]\d{8}$/,
                                                message: 'Please enter a valid Bangladeshi phone number'
                                            }
                                        })}
                                        placeholder="01XXXXXXXXX"
                                        className={`input input-bordered w-full ${errors.senderContact ? 'input-error' : ''}`}
                                    />
                                    {errors.senderContact && (
                                        <span className="text-error text-sm mt-1">{errors.senderContact.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Pickup Instructions</span>
                                    </label>
                                    <textarea
                                        {...register('pickupInstruction')}
                                        placeholder="Any special instructions for pickup..."
                                        className="textarea textarea-bordered w-full"
                                        rows="3"
                                    />
                                </div>
                            </div>
          </div>

          {/* Receiver */}
                        <div className="bg-gray-50 p-6 rounded-2xl">
                            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaEnvelope className="w-5 h-5 text-green-600" />
                                Receiver Details
                            </h4>
          <div className="space-y-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Name *</span>
                                    </label>
                                    <input
                                        {...register('receiverName', { required: 'Receiver name is required' })}
                                        placeholder="Receiver Name"
                                        className={`input input-bordered w-full ${errors.receiverName ? 'input-error' : ''}`}
                                    />
                                    {errors.receiverName && (
                                        <span className="text-error text-sm mt-1">{errors.receiverName.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Region *</span>
                                    </label>
                                    <select
                                        {...register('receiverRegion', { required: 'Please select a region' })}
                                        className={`select select-bordered w-full ${errors.receiverRegion ? 'select-error' : ''}`}
                                    >
                                        <option value="">Select your region</option>
                                        {divisions.map((division, index) => (
                                            <option key={index} value={division}>{division}</option>
                                        ))}
            </select>
                                    {errors.receiverRegion && (
                                        <span className="text-error text-sm mt-1">{errors.receiverRegion.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Warehouse</span>
                                    </label>
                                    <select
                                        {...register('receiverWarehouse')}
                                        className="select select-bordered w-full"
                                        disabled={!watchedReceiverRegion || watchedReceiverRegion === 'Select your region'}
                                    >
                                        <option value="">Select Warehouse</option>
                                        {receiverWarehouses.map((warehouse, index) => (
                                            <option key={index} value={warehouse.city}>
                                                {warehouse.city} - {warehouse.district}
                                            </option>
                                        ))}
            </select>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Address</span>
                                    </label>
                                    <input
                                        {...register('receiverAddress')}
                                        placeholder="Full address"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Contact *</span>
                                    </label>
                                    <input
                                        {...register('receiverContact', {
                                            required: 'Contact number is required',
                                            pattern: {
                                                value: /^(\+880|880|0)?1[3-9]\d{8}$/,
                                                message: 'Please enter a valid Bangladeshi phone number'
                                            }
                                        })}
                                        placeholder="01XXXXXXXXX"
                                        className={`input input-bordered w-full ${errors.receiverContact ? 'input-error' : ''}`}
                                    />
                                    {errors.receiverContact && (
                                        <span className="text-error text-sm mt-1">{errors.receiverContact.message}</span>
                                    )}
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text font-semibold">Delivery Instructions</span>
                                    </label>
                                    <textarea
                                        {...register('deliveryInstruction')}
                                        placeholder="Any special instructions for delivery..."
                                        className="textarea textarea-bordered w-full"
                                        rows="3"
                                    />
                                </div>
                            </div>
          </div>
        </div>

                    {/* Information Banner */}
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                            <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h5 className="font-semibold text-blue-800 mb-1">Important Information</h5>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Pickup time: 4:00 PM - 7:00 PM (Approximate)</li>
                                    <li>• Delivery time: 24-48 hours within same region</li>
                                    <li>• Please ensure all contact information is accurate</li>
                                    <li>• Fragile items should be properly packed</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn bg-lime-500 hover:bg-lime-600 text-white px-12 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle className="w-5 h-5" />
          Proceed to Confirm Booking
                                </>
                            )}
        </button>
                    </div>
      </form>
    </section>
        </div>
  );
};

export default AddParcel;
