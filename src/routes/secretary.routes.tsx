import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "../components/secretary/sidebar/sidebar.component";
import Navbar from "../components/secretary/navbar/navbar.component";

const DashboardPage = lazy(
	() => import("../pages/secretary/dashboard/dashboard.page")
);
const ConsultationsPage = lazy(
	() => import("../pages/secretary/consultations/consultations.page")
);

const PatientsPage = lazy(
	() => import("../pages/secretary/patients/patients.page")
);
const SchedulesPage = lazy(
	() => import("../pages/secretary/schedules/schedules.page")
);
const ReportsPage = lazy(
	() => import("../pages/secretary/reports/reports.page")
);

const DoctorsPage = lazy(
	() => import("../pages/secretary/doctors/doctors.page")
);

const SecretaryRoutes: React.FC = () => {
	return (
		<div className="admin-page-wrapper">
			<Navbar />
			<div className="main-content-wrapper">
				<Sidebar />

				<div className="main-content">
					<Switch>
						<Route
							path="/admin/dashboard"
							component={DashboardPage}
						/>
						<Route
							path="/admin/consultations"
							component={ConsultationsPage}
						/>
						<Route
							path="/admin/schedules"
							component={SchedulesPage}
						/>
						<Route path="/admin/doctors" component={DoctorsPage} />
						<Route
							path="/admin/patients"
							component={PatientsPage}
						/>

						<Route path="/admin/reports" component={ReportsPage} />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default SecretaryRoutes;
