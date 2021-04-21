import moment from "moment";

export interface PatientInfo {
	_id: string;
	email: string;
	password: string;
	image?: string;
	fname: string;
	mname: string;
	lname: string;
	gender?: string;
	birthdate?: Date;
	phoneNumber?: string;
	occupation?: string;
	educationalAttainment?: string;
	philHealthNumber?: string;
	address?: string;
	brgy?: string;
	city_municipality?: string;
	province?: string;
	status: boolean;
	createdAt?: Date;
	role: string;
}

export interface Appointment {
	_id: string;
	patient: PatientInfo;
	schedule: Schedule;
	appointmentDate: Date;
	appointmentStatus: string;
	brgy: string;
	city_municipality: string;
	province: string;
}

export interface Schedule {
	_id: string;
	type: string;
	title: string;
	description: string;
	healthWorker: string;
	numberOfSlot: number;
	consultationDate: any | moment.Moment;
	consultationTime: any | moment.Moment;
	isStarted: boolean;
	currentNumber?: number;
	startStatus: string;
	createdAt: Date;
}
