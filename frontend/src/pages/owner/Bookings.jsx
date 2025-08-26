
import {
  MapPin,
  Users,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash2,
} from "lucide-react";

import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext.jsx";
import { useEffect, useState, useContext } from "react";

const Bookings = () => {
  const { axios , navigate} = useContext(AppContext);
  const [bookingData, setBookingData] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookingData(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const getStatusTextColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return CheckCircle;
      case "pending":
        return Clock;
      case "cancelled":
        return XCircle;
      default:
        return Clock;
    }
  };

  const handleCancel = (id) => {
    setBookingData((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
    );
  };

  const handleDelete = (id) => {
    setBookingData((prev) => prev.filter((b) => b._id !== id));
  };


  return (
    <div className="min-h-screen bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Bookings</h1>
          <p className="text-gray-600 text-lg">
            Here are your hotel bookings. You can view details and manage your
            reservations.
          </p>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:grid md:grid-cols-12 bg-gray-50 px-6 py-4 border-b border-gray-200 font-semibold text-gray-700">
            <div className="col-span-4">Hotel & Room</div>
            <div className="col-span-3">Dates</div>
            <div className="col-span-2">Payment</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Booking Items */}
          <div className="divide-y divide-gray-100">
            {bookingData.map((booking) => {
              const StatusIcon = getStatusIcon(booking.status);
              return (
                <div
                  key={booking._id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center">
                    {/* Hotel & Room */}
                    <div className="col-span-4 flex gap-4">
                      <img
                        src={`http://localhost:3000/${booking.room.images[0]}`}
                        alt={booking.room.roomType}
                        className="w-20 h-16 md:w-24 md:h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg mb-1">
                          {booking.hotel.hotelName}
                        </h3>
                        <p className="text-blue-600 font-medium mb-1">
                          {booking.room.roomType}
                        </p>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                          <MapPin className="w-3 h-3" />
                          <span>{booking.hotel.hotelAddress}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Users className="w-3 h-3" />
                          <span>
                            {booking.persons} Guest
                            {booking.persons > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="col-span-3 space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium text-gray-800">
                          {new Date(booking.checkIn).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-medium text-gray-800">
                          {new Date(booking.checkOut).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-800">
                          {booking.paymentMethod}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {booking.totalPrice} USD
                      </p>
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          booking.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <p>{booking.isPaid ? "Paid" : "Pay Now"}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 flex items-center gap-2">
                      <StatusIcon
                        className={`h-5 w-5 ${getStatusTextColor(
                          booking.status
                        )}`}
                      />
                      <span
                        className={`font-medium ${getStatusTextColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1">
                      <div className="flex gap-1">
                        {/* Cancel Booking */}
                        {booking.status !== "cancelled" && (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Delete Booking */}
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Delete Booking"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>

                        {/* View Booking */}
                        <button
                          onClick={() => navigate(`/booking/${booking._id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Booking"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Empty State */}
            {bookingData.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                No bookings found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
