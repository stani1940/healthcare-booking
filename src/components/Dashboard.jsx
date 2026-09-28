function Dashboard() {
  return (
    <section id="dashboard">
      <div className="container">

        <div className="section-title">
          <h2>Dashboard</h2>
          <p>Welcome to Health Center</p>
        </div>

        <div className="row">

          <div className="col-md-4 col-sm-6">
            <div className="team-thumb">
              <div className="team-info">
                <h3>Doctors</h3>
                <p>Manage doctors</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="team-thumb">
              <div className="team-info">
                <h3>Appointments</h3>
                <p>Manage appointments</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-6">
            <div className="team-thumb">
              <div className="team-info">
                <h3>Profile</h3>
                <p>Manage your profile</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;