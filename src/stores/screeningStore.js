import {writable} from "svelte/store";
import {browser} from "$app/env"

const screening_state = browser && JSON.parse(localStorage.getItem("screening_state")) || {};
const ScreeningStore = writable(browser && screening_state || {});
ScreeningStore.subscribe(data => {
    if (browser) localStorage.setItem("screening_state", JSON.stringify(data));
});

export default ScreeningStore;
