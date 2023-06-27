<script>
    import Day from './day.svelte'
    import screenings_data from "../jsons/screenings_out.json";
    import movies_data from "../jsons/movies_out.json";

    export let screenings;

    let screenings_info = {};
    for (let i = 0; i < screenings_data.length; i++) {
        const screening = screenings_data[i]
        screenings_info[screening.id] = screening
    }

    const movies = {};
    for (let i = 0; i < movies_data.length; i++) {
        let movie = movies_data[i]
        const screenings_movie = []
        for (let j = 0; j < movie.screenings_ids.length; j++) {
            const idx = movie.screenings_ids[j]
            const s = screenings_info[idx]
            screenings_movie.push({
                'code': s.code,
                'date': s.date,
                'cinema': s.cinema,
                'id': s.id,
                'timestamp': s.timestamp
            })
        }
        movie.screenings = screenings_movie
        movies[movie.id] = movie
    }

</script>


{#each Object.entries(screenings) as [day, data]}
    <Day day={day} data={data} movies={movies}/>
{/each}


