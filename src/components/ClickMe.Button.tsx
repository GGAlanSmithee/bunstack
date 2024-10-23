export const ClickMe = ({ from = "Client" }) => (
  <button
    className="bg-gray-900 hover:bg-gray-700 active:bg-gray-600 transition-colors duration-200 text-white font-bold py-2 px-4 rounded"
    onClick={() => alert("Client working fine")}
  >
    Click me from {from}
  </button>
)
