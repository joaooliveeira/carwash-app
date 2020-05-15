import { actions } from ".";

export const setRunningWashes = washes => ({
    type: actions.SET_RUNNING_WASHES,
    washes
});