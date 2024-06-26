<script>
    import Screening from './screening.svelte';
    import ScreeningPreview from './screening_preview.svelte';
    import Time from "svelte-time";

    export let day, data, movies;
    let visible = false;

    function toggle() {
        visible = !visible;
    }
</script>
<div class="dayheader">
    <div on:click={toggle}>
        <b>{day}</b>
    </div>
    <div class="right">
        <Time timestamp={"2024" + "-" + day.split('.')[1] + "-" + day.split('.')[0]} format="dddd"/>
    </div>
</div>
{#if visible}
    {#each Object.entries(data) as [cinema, screenings]}
        <h4>{cinema}</h4>
        <div class="place">
            {#each screenings as screening (screening.id)}
                <Screening timestamp={screening.timestamp} code={screening.code} movie={movies[screening.movie]}>
                    <p>Další projekce:</p>
                    <table id="projtable">
                        <tbody>
                        {#each movies[screening.movie].screenings as s}
                            {#if s.id !== screening.id}
                                <ScreeningPreview code={s.code} timestamp={s.timestamp +  31536000} cinema={s.cinema}/>
                            {/if}
                        {/each}
                        </tbody>
                    </table>
                </Screening>
            {/each}
        </div>
    {/each}
{/if}

