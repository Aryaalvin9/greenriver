import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

const Notification = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Tunggu animasi selesai sebelum menutup
    }, 5000); // Notifikasi muncul selama 5 detik

    return () => clearTimeout(timer);
  }, [onClose]);

  const notificationStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const iconStyles = {
    success: <FaCheckCircle className="text-white text-4xl" />,
    error: <FaExclamationCircle className="text-white text-4xl" />,
    info: <FaInfoCircle className="text-white text-4xl" />,
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-96 text-center ${notificationStyles[type]} border-4 border-white`}
        style={{ animation: "fadeIn 0.5s ease-in" }}
      >
        <div className="mb-4">
          {iconStyles[type]} {/* Menampilkan ikon sesuai jenis */}
        </div>
        <div className="text-lg font-semibold text-white mb-4">{message}</div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
