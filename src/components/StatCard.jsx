const StatCard = ({ title, value, icon: Icon }) => (
  <div className="p-6 bg-white/90 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
      <div className="h-10 w-10 rounded-xl bg-gradient-eco flex items-center justify-center">
        <Icon className="text-white" size={20} />
      </div>
    </div>
  </div>
);

export default StatCard;
