<script>
    import ScreeningStore from "../stores/screeningStore.js";
    import Buttons from "./buttons.svelte"
    import {onDestroy} from "svelte";
    import Time from "svelte-time";
    import {State} from "../state.js";

    export let timestamp, code, movie;
    let state = State.Default;

    const unsubscribe = ScreeningStore.subscribe(data => {
        state = data[code];
    })

    let color
    $: {
        console.log(state)
        switch (state) {
            case State.Wish:
                color = "#fdf4d7"
                break;
            case State.Wait:
                color = "#ffdbe6"
                break
            case State.Ticket:
                color = "#c8ffc1"
                break
            default:
                color = "#f0f0ff"
        }
    }

    let visible = false;

    onDestroy(unsubscribe)

    function toggle() {
        visible = !visible;
    }

</script>
<div class="proj" style="background-color:{color}">
    <div on:click={toggle}>
        <Time timestamp={new Date(parseInt(timestamp) * 1000 - 2*60*60*1000)} format="HH:mm"/>
        <b>{code}</b> {movie.title} <span class="small">| {movie.duration}</span>
    </div>
    <div class="right">
        <Buttons state={state} id={code}/>
    </div>
</div>
{#if visible}
    <div class="desc">
        <br>Sekce: <b>{movie.section}</b>
        | Země: <b>
        {#each movie.countries as country, index}
            { index === movie.countries.length - 1 ? country : `${country}, `}
        {/each}
    </b>
        | Režie: <b>{movie.director}</b>
        | Rok: <b>{movie.year}</b>
        <p>{movie.synopsis}<br>
        </p>
    </div>
    <slot></slot>
{/if}
