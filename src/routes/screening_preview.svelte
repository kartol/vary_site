<script>
    import ScreeningStore from "../stores/screeningStore.js";
    import Buttons from "./buttons.svelte"
    import {onDestroy} from "svelte";
    import {State} from "../state.js";

    export let code, time, cinema
    let state = State.Default;

    const unsubscribe = ScreeningStore.subscribe(data => {
        state = data[code];
    })


    onDestroy(unsubscribe)

    let color

    $: {
        console.log(state)
        switch (state) {
            case State.Wish:
                color = "#fdf4d7"
                break;
            case State.Wait:
                color = "#d7edfd"
                break
            case State.Ticket:
                color = "#ffdbe6"
                break
            default:
                color = 'white'
        }
    }

</script>

<tr class="" data-id-proj="57|34267-1" style="background-color:{color}">
    <td>{code}</td>
    <!--                <td>Ne</td>-->
    <td class="taright">{time}</td>
    <td>{cinema}</td>
    <td>
        <Buttons state={state} id={code}/>
    </td>
</tr>

