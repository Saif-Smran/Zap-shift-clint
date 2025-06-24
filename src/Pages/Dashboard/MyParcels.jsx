import React, { useState } from 'react';
import UseAuth from '../../Hooks/UseAuth';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ParcelDetailsModal from './ParcelDetailsModal';

const fetchParcels = async (email) => {
  const { data } = await axios.get(`http://localhost:3000/products?email=${email}`);
  return data;
};

const deleteParcel = async (id) => {
  const { data } = await axios.delete(`http://localhost:3000/products/${id}`);
  return data;
};

const fetchParcelById = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/products?id=${id}`);
  return data;
};

const MyParcels = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const [viewId, setViewId] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  // Fetch parcels
  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: () => fetchParcels(user.email),
    enabled: !!user?.email
  });

  // Delete mutation
  const mutation = useMutation({
    mutationFn: deleteParcel,
    onSuccess: () => {
      queryClient.invalidateQueries(['my-parcels', user?.email]);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Parcel deleted successfully.',
        confirmButtonColor: '#10b981',
      });
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: 'Could not delete parcel. Please try again.',
        confirmButtonColor: '#ef4444',
      });
    }
  });

  // View handler
  const handleView = async (id) => {
    setViewLoading(true);
    setViewId(id);
    try {
      const data = await fetchParcelById(id);
      setViewData(data);
    } catch {
      setViewData(null);
    } finally {
      setViewLoading(false);
    }
  };

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the parcel.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#10b981',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-lime-600"></span>
        </div>
      ) : parcels.length === 0 ? (
        <div className="text-center text-gray-500">No parcels found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Parcel ID</th>
                <th>Status</th>
                <th>Date</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(parcel => (
                <tr key={parcel.parcelId || parcel._id}>
                  <td className="font-mono text-xs">{parcel.parcelId || '-'}</td>
                  <td>{parcel.status || '-'}</td>
                  <td>{parcel.createdAt ? new Date(parcel.createdAt).toLocaleString() : '-'}</td>
                  <td>৳{parcel.totalPrice || '-'}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-xs btn-info text-white"
                      onClick={() => handleView(parcel._id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-xs btn-error text-white"
                      onClick={() => handleDelete(parcel._id)}
                      disabled={mutation.isLoading}
                    >
                      {mutation.isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {viewId && (
        <ParcelDetailsModal
          viewData={viewData}
          viewLoading={viewLoading}
          setViewId={setViewId}
          setViewData={setViewData}
        />
      )}
    </div>
  );
};

export default MyParcels; 