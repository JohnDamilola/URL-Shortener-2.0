import "./styles.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <div className="flex justify-between items-center">
                  <div>
                    <h3>
                      <b>Hey, Welcome Back!</b> 👋
                    </h3>
                    <p className="">
                      Let's start create simple and easy-to-remember custom links from long URLs
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    );
};

export default Dashboard;