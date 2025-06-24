import { FaTimes, FaInfoCircle } from 'react-icons/fa';

const ParcelDetailsModal = ({ viewData, viewLoading, setViewId, setViewData }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Background Overlay */}
      <div
        className="absolute inset-0  bg-opacity-20 backdrop-blur-sm"
        onClick={() => {
          setViewId(null);
          setViewData(null);
        }}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md z-10 border border-gray-200">
        
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
          onClick={() => {
            setViewId(null);
            setViewData(null);
          }}
        >
          <FaTimes />
        </button>

        {/* Content */}
        {viewLoading ? (
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg text-lime-600"></span>
          </div>
        ) : viewData ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4 text-lime-600">
              <FaInfoCircle className="text-xl" />
              <h3 className="text-xl font-bold text-gray-800">Parcel Details</h3>
            </div>

            <div><span className="font-semibold text-gray-700">Parcel ID:</span> {viewData.parcelId || '-'}</div>
            <div><span className="font-semibold text-gray-700">Status:</span> {viewData.status || '-'}</div>
            <div><span className="font-semibold text-gray-700">Date:</span> {viewData.createdAt ? new Date(viewData.createdAt).toLocaleString() : '-'}</div>
            <div><span className="font-semibold text-gray-700">Price:</span> ৳{viewData.totalPrice || '-'}</div>
            <div><span className="font-semibold text-gray-700">Type:</span> {viewData.type || '-'}</div>
            <div><span className="font-semibold text-gray-700">Sender:</span> {viewData.senderName || '-'} ({viewData.senderContact || '-'})</div>
            <div><span className="font-semibold text-gray-700">Receiver:</span> {viewData.receiverName || '-'} ({viewData.receiverContact || '-'})</div>
            <div><span className="font-semibold text-gray-700">Route:</span> {viewData.senderRegion} → {viewData.receiverRegion}</div>
            <div><span className="font-semibold text-gray-700">Creator Email:</span> {viewData.creatorEmail || '-'}</div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4">Failed to load parcel details.</div>
        )}
      </div>
    </div>
  );
};

export default ParcelDetailsModal;
