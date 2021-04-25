import { atom, RecoilState } from 'recoil';

export enum LSKey {
  APP_STATE = 'RM_APP_STATE'
}

export interface RedisKey {

}

export interface Connection {
  host: string,
  port: number,
  password: string,
  separator: string,
  name: string,
  open: boolean,
  keys: RedisKey[],
}

export interface Tab {
  title: string,
}

export interface AppState {
  connections: Connection[],
  tabs: Tab[],
}

function loadAppStateFromLocalStorage(): AppState {
  const stringifyJSON: string | null = localStorage.getItem(LSKey.APP_STATE)
  let loadedAppState: AppState = {
    connections: [],
    tabs: [],
  }
  if (typeof stringifyJSON === 'string') {
    loadedAppState = JSON.parse(stringifyJSON)
  }
  return loadedAppState
}

export const recoilState: RecoilState<AppState> = atom({
  key: 'app_state',
  default: loadAppStateFromLocalStorage(),
})

