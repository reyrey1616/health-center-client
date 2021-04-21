import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { add, remove, update } from "../utils";
import axios from "axios";
import { AppThunk } from "../store";
import { errorCatch } from "../utils";
export const ScheduleSlice = createSlice({
	name: "schedules",
	initialState: {
		loading: false,
		schedules: [],
		error: null,
		current: null,
	},
	reducers: {
		scheduleLoading: (state) => {
			state.loading = true;
		},
		scheduleError: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		addScheduleSuccess: (state, action) => {
			state.loading = false;
			state.schedules = add(state.schedules, action.payload);
		},
		getScheduleSuccess: (state, action) => {
			state.loading = false;
			state.schedules = action.payload;
		},
		deleteScheduleSuccess: (state, action) => {
			state.loading = false;
			state.schedules = remove(state.schedules, action.payload);
		},
		updateScheduleSuccess: (state, action) => {
			state.loading = false;
			state.schedules = update(state.schedules, action.payload);
		},
		setCurrentSchedule: (state, action) => {
			state.current = action.payload;
		},
	},
});

export const createSchedule = (
	payload: any,
	callback: () => void
): AppThunk => async (dispatch) => {
	dispatch(scheduleLoading());
	try {
		const req = await axios.post("/schedules", payload);
		const res = await req.data;

		if (res.success) {
			setTimeout(() => {
				dispatch(addScheduleSuccess(res.data));
				callback();
			}, 1000);
		} else {
			throw Error;
		}
	} catch (error) {
		errorCatch(error, "Error creating schedule!");
		dispatch(scheduleError(error));
	}
};

export const getSchedules = (): AppThunk => async (dispatch) => {
	dispatch(scheduleLoading());
	try {
		const req = await axios.get("/schedules/?status=true");
		const res = await req.data;

		if (res.success) {
			setTimeout(() => {
				dispatch(getScheduleSuccess(res.data));
			}, 500);
		} else {
			throw Error;
		}
	} catch (error) {
		errorCatch(error, "Error creating schedule!");
		dispatch(scheduleError(error));
	}
};

export const deleteSchedule = (
	id: string,
	callback: () => void
): AppThunk => async (dispatch) => {
	dispatch(scheduleLoading());
	try {
		const req = await axios.put(`/schedules/${id}`, {
			status: false,
		});

		const res = await req.data;

		if (res.success) {
			setTimeout(() => {
				dispatch(deleteScheduleSuccess(res.data));
				callback();
			}, 500);
		} else {
			throw Error;
		}
	} catch (error) {
		errorCatch(error, "Error deleting schedule!");
		dispatch(scheduleError(error));
	}
};

export const setCurrent = (payload: any): AppThunk => async (dispatch) => {
	dispatch(setCurrentSchedule(payload));
};

export const updateSchedule = (
	id: string,
	payload: any,
	callback: () => void
): AppThunk => async (dispatch) => {
	dispatch(scheduleLoading());
	try {
		const req = await axios.put(`/schedules/${id}`, payload);

		const res = await req.data;
		if (res.success) {
			setTimeout(() => {
				dispatch(updateScheduleSuccess(res.data));
				callback();
			}, 500);
		} else {
			throw Error;
		}
	} catch (error) {
		errorCatch(error, "Error updating schedule!");
		dispatch(scheduleError(error));
	}
};

export const {
	scheduleLoading,
	scheduleError,
	addScheduleSuccess,
	getScheduleSuccess,
	deleteScheduleSuccess,
	setCurrentSchedule,
	updateScheduleSuccess,
} = ScheduleSlice.actions;

export default ScheduleSlice.reducer;