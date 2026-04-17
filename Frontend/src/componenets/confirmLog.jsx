const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      
      <div className="bg-white p-5 rounded-xl shadow-lg w-80 text-center">

        <h3 className="text-lg font-semibold mb-3">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mb-5">
          {message}
        </p>

        <div className="flex justify-center gap-3">
          
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;