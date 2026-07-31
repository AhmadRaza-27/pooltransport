import "./AuthLayout.css";


const AuthLayout = ({
    children,
    title,
    subtitle
}) => {

    return (

        <div className="fleet-auth">


            {/* LEFT BRAND SECTION */}

            <section className="fleet-brand">


                <div className="fleet-overlay"></div>


                <div className="brand-content">


                    <img
                        src="/images/logo.png"
                        alt="Pool Ops Logo"
                        className="brand-logo"
                    />


                    <h1>
                        POOL OPS
                    </h1>


                    <h3>
                        Transport Intelligence Platform
                    </h3>


                    <p>
                        Navigate every journey.
                        Control every movement.
                        Manage every route.
                    </p>



                    <div className="feature-list">


                        <div>
                            <span></span>
                            Real-time Fleet Coordination
                        </div>


                        <div>
                            <span></span>
                            Smart Route Intelligence
                        </div>


                        <div>
                            <span></span>
                            Connected Transport Network
                        </div>


                    </div>



                    <div className="powered">

                        POWERED BY PRECISION

                    </div>


                </div>


            </section>





            {/* RIGHT LOGIN SECTION */}


            <section className="fleet-login">


                <div className="login-container">


                    <div className="login-header">


                        <h2>
                            {title}
                        </h2>


                        <p>
                            {subtitle}
                        </p>


                    </div>



                    {children}



                    <div className="security-text">

                        🔒 Secure Transport Operations Portal

                    </div>


                </div>


            </section>


        </div>

    );

};


export default AuthLayout;