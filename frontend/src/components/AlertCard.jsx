const AlertCard = ({ type, message }) => {
  const color =
    type === "warning"
      ? "bg-yellow-100 text-yellow-800"
      : type === "error"
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";

  return (
    <div className={`p-4 rounded-xl ${color} font-medium shadow-sm`}>
      ⚠️ {message}
    </div>
  );
};

export default AlertCard;
