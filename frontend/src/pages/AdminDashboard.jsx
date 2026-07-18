function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-blue-600 text-white p-5 shadow-md">
        <h1 className="text-3xl font-bold">
          Smart Queue Management System
        </h1>

        <p className="text-sm mt-1">
          Admin Dashboard
        </p>
      </header>

      <main className="p-8">

        <h2 className="text-2xl font-bold mb-8">
          Dashboard Overview
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">People in Queue</h3>

            <p className="text-4xl font-bold mt-3">
              25
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">
              Waiting Time
            </h3>

            <p className="text-4xl font-bold mt-3">
              18 min
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500">
              Counters Active
            </h3>

            <p className="text-4xl font-bold mt-3">
              4
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;