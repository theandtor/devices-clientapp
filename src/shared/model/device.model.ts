export interface IDevice {
  id?: any;
  system_name?: string;
  type?: string;
  hdd_capacity?: number | null;
}

export const defaultValue: Readonly<IDevice> = {
  id: null,
  system_name: '',
  type: '',
  hdd_capacity: null,
};
