import {
    Search,
    ClipboardList,
    CreditCard
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import RideSummary from "../../components/seeker/RideSummary";
import QuickActionCard from "../../components/seeker/QuickActionCard";

const SeekerDashboard = () => {


    return (

        <DashboardLayout>


            <div className="seeker-header">

                <h1>
                    Good Morning, Seeker
                </h1>


                <p>
                    Find and manage your daily rides easily.
                </p>

            </div>




            <RideSummary />





            <section className="quick-section">


                <h2>
                    Quick Actions
                </h2>



                <div className="quick-grid">


                    <QuickActionCard

                        icon={<Search size={28}/>}

                        title="Find Ride"

                        description="Search available rides near you"

                    />



                    <QuickActionCard

                        icon={<ClipboardList size={28}/>}

                        title="My Requests"

                        description="Track your ride approvals"

                    />



                    <QuickActionCard

                        icon={<CreditCard size={28}/>}

                        title="Payments"

                        description="View your ride fees"

                    />


                </div>


            </section>




        </DashboardLayout>

    );

};


export default SeekerDashboard;