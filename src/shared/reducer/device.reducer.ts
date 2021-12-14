import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { serializeAxiosError } from './reducer.utils';
import { IDevice, defaultValue } from '../model/device.model';
import { SERVER_DOMAIN } from '../constants/environment.constants';

const initialState = {
  loading: false,
  errorMessage: null as string | undefined | null,
  devices: [] as ReadonlyArray<IDevice>,
  device: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const apiUrl = `${SERVER_DOMAIN}/devices`;

// Async Actions

export const getDevices = createAsyncThunk('devices/get', async () => {
  const requestUrl = `${apiUrl}`;
  return axios.get<IDevice[]>(requestUrl);
});

export const getDevice = createAsyncThunk(
  'device/get',
  async (id: string) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IDevice>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createDevice = createAsyncThunk(
  'device/post',
  async (device: IDevice, thunkAPI) => {
    const result = await axios.post<IDevice>(`${apiUrl}`, device);
    thunkAPI.dispatch(getDevices());
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateDevice = createAsyncThunk(
  'device/put',
  async (device: IDevice, thunkAPI) => {
    const result = await axios.put<IDevice>(`${apiUrl}/${device.id}`, device);
    thunkAPI.dispatch(getDevices());
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteDevice = createAsyncThunk(
  'device/delete',
  async (id: string, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IDevice>(requestUrl);
    thunkAPI.dispatch(getDevices());
    return result;
  },
  { serializeError: serializeAxiosError }
);

export type DeviceManagementState = Readonly<typeof initialState>;

export const DeviceManagementSlice = createSlice({
  name: 'deviceManagement',
  initialState: initialState as DeviceManagementState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDevice.fulfilled, (state, action) => {
        state.loading = false;
        state.device = action.payload.data;
      })
      .addCase(deleteDevice.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.device = defaultValue;
      })
      .addMatcher(isFulfilled(getDevices), (state, action) => {
        state.loading = false;
        state.devices = action.payload.data;
      })
      .addMatcher(isFulfilled(createDevice, updateDevice), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.device = action.payload.data;
      })
      .addMatcher(isPending(getDevices, getDevice), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createDevice, updateDevice, deleteDevice), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      .addMatcher(isRejected(getDevices, getDevice, createDevice, updateDevice, deleteDevice), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = DeviceManagementSlice.actions;

// Reducer
export default DeviceManagementSlice.reducer;
