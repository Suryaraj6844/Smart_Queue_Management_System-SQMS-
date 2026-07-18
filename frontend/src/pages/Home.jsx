function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">
            Smart Queue Management System
          </h1>

          <p className="text-xl max-w-3xl mx-auto mb-8">
            Manage queues digitally, reduce waiting time, and provide
            a smooth service experience for students and administrators.
          </p>


          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Join Queue Now
          </button>

        </div>

      </section>



      {/* Introduction Section */}
      <section className="py-16 bg-gray-100">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-10">
            Why Smart Queue Management?
          </h2>


          <div className="grid md:grid-cols-3 gap-8">


            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3 text-blue-600">
                Digital Token System
              </h3>

              <p>
                Get your token online and avoid standing in long physical queues.
              </p>
            </div>



            <div className="bg-white p-6 rounded-xl shadow-md">

              <h3 className="text-xl font-bold mb-3 text-blue-600">
                Live Queue Updates
              </h3>

              <p>
                Track your position and estimated waiting time in real time.
              </p>

            </div>




            <div className="bg-white p-6 rounded-xl shadow-md">

              <h3 className="text-xl font-bold mb-3 text-blue-600">
                Admin Control
              </h3>

              <p>
                Administrators can manage queues and serve students efficiently.
              </p>

            </div>


          </div>

        </div>

      </section>



      {/* How It Works */}
      <section className="py-16">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-8">
            How It Works
          </h2>


          <div className="grid md:grid-cols-3 gap-8">


            <div>
              <div className="text-4xl mb-3">
                1️⃣
              </div>

              <h3 className="font-bold text-xl">
                Select Queue
              </h3>

              <p>
                Choose the department you need service from.
              </p>

            </div>



            <div>

              <div className="text-4xl mb-3">
                2️⃣
              </div>

              <h3 className="font-bold text-xl">
                Get Token
              </h3>

              <p>
                Receive your digital queue token instantly.
              </p>

            </div>



            <div>

              <div className="text-4xl mb-3">
                3️⃣
              </div>

              <h3 className="font-bold text-xl">
                Get Served
              </h3>

              <p>
                Visit the counter when your turn arrives.
              </p>

            </div>


          </div>

        </div>

      </section>


    </div>
  );
}

export default Home;