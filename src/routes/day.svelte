<script>
    import Screening from './screening.svelte';
    import ScreeningPreview from './screening_preview.svelte';

    export let day, data, movies;
    let visible = false;

    function toggle() {
        visible = !visible;
    }
</script>
<h3 on:click={toggle}>{day}</h3>
{#if visible}
    {#each Object.entries(data) as [cinema, screenings]}
        <h4>{cinema}</h4>
        <div class="place">
            {#each screenings as screening (screening.id)}
                <Screening time={screening.datetime} code={screening.code}
                           movie={movies[screening.movie]}>
                    <p>Další projekce:</p>
                    <table id="projtable">
                        <tbody>
                        {#each movies[screening.movie].screenings as s}
                            {#if s.id !== screening.id}
                                <ScreeningPreview code={s.code} time={s.date} cinema={s.cinema}/>
                            {/if}
                        {/each}
                        </tbody>
                    </table>
                </Screening>
            {/each}
        </div>
    {/each}
{/if}

