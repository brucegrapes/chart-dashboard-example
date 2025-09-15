interface DeleteConfirmationDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationDialog({ onCancel, onConfirm }: DeleteConfirmationDialogProps) {
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-xs shadow-lg rounded-lg p-4 drag-cancel bg-transparent bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this dashboard?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}