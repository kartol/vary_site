<script>
    import Fa from 'svelte-fa/src/fa.svelte'
    import {faStar, faChair, faTicket} from '@fortawesome/free-solid-svg-icons/index.es'
    import {State} from "../state.js";
    import ScreeningStore from "../stores/screeningStore.js";

    export let state = State.Default, id;
    let colorWish = 'black', colorWait = 'black', colorTicket = 'black'


    function resetColors() {
        colorWish = 'black'
        colorWait = 'black'
        colorTicket = 'black'
    }

    function setColors() {
        switch (state) {
            case State.Wish:
                resetColors()
                colorWish = '#e5b600'
                break;
            case State.Wait:
                resetColors()
                colorWait = '#0046fd'
                break
            case State.Ticket:
                resetColors()
                colorTicket = '#ff547f'
                break
            default:
                resetColors()
                break
        }
    }

    $: {
        console.log(state)
        setColors()
    }

    function handleChange(newState) {
        if (newState === state) {
            state = State.Default
            resetColors()
            ScreeningStore.update(data => {
                data[id] = state
                return data
            })
            return
        }

        ScreeningStore.update(data => {
            data[id] = newState
            return data
        })

        state = newState
        setColors()
    }

</script>

<span on:click={() => handleChange(State.Wish)}>
    <Fa icon={faStar} color={colorWish}/>
</span>
<span on:click={() => handleChange(State.Wait)}>
    <Fa icon={faChair} color={colorWait}/>
</span>
<span on:click={() => handleChange(State.Ticket)}>
    <Fa icon={faTicket} color={colorTicket}/>
</span>
