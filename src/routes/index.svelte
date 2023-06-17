<script>

    import Days from './days.svelte'
    import screenings_by_day from "../jsons/screenings_by_day.json";
    import {State} from "../state.js";
    import ScreeningStore from "../stores/screeningStore.js";
    import {onDestroy} from "svelte";

    let states = {};
    let showMyProjections = false;
    const unsubscribe = ScreeningStore.subscribe(data => {
        states = data;
    })

    let screenings_by_day_out = {}

    onDestroy(unsubscribe)

    function resetFilter(filter) {
        screenings_by_day_out = {}
        // filter initial data
        for (const [day, v] of Object.entries(screenings_by_day)) {
            let by_day = {}
            for (const [cinema, screenings] of Object.entries(v)) {
                const screenings_out = screenings.filter(s =>
                    filter || (s.code in states && states[s.code] !== State.Default)
                )
                if (screenings_out.length > 0) {
                    by_day[cinema] = screenings_out
                }
            }
            if (Object.keys(by_day).length > 0) {
                screenings_by_day_out[day] = by_day
            }
        }
    }

    resetFilter(!showMyProjections)

    $:  resetFilter(!showMyProjections);

</script>
<div class="filter">
    <input type=checkbox bind:checked={showMyProjections}>
    <label>Jen mé projekce</label>
</div>

<Days bind:screenings={screenings_by_day_out}/>

<style>
    div.filter {
        display: flex;
        flex-direction: row-reverse;
        padding-top: 1em;
        padding-right: 1em;
        padding-bottom: 1em;
    }

    label {
        order: 2;
        padding-right: 0.5em;
    }

    input {
        align-self: center;
        order: 1;
    }

</style>
