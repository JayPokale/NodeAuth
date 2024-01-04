const Popover = ({ title, content, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
    <div className="relative mx-auto my-6 w-full max-w-md">
      <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg text-left overflow-hidden">
        <div className="flex items-start justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onCancel}
            className="p-1 ml-auto bg-transparent border-0 text-black dark:text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
          >
            ×
          </button>
        </div>
        <div className="relative p-6 flex-auto">
          <p className="my-4 text-gray-600 dark:text-gray-300">{content}</p>
        </div>
        <div className="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onConfirm}
            className="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Popover;
