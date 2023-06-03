<script>
  import LineDiagram from "./lib/line-diagram.svelte";

  /* let randomData = {
    name: 'Random Diagram',
    values: Array(30).fill(1).map(x => Math.random() * 100 + 10),
  }

  setTimeout(() => {
    console.log('New Random Data');

    randomData.values = [10, 10]
    /* randomData = randomData
  }, 1000) */

  let lon = 13.41
  let lat = 52.52
  
  async function getWeatherData() {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`)
    return await response.json()
  }
  let weatherDataPromise = getWeatherData()
  $: {
    console.log(lat, lon);
    weatherDataPromise = getWeatherData()
  }
</script>

<div class="container">
  <h2>My Cool Line Diagram</h2>

  <input type="text" bind:value={lat}>

  <br> 
  <div class="weather_container">
    <!-- Await -->
    {#await weatherDataPromise}
      <p>Waiting for weather data...</p>
    {:then data}
      <LineDiagram values={data.hourly.temperature_2m} name="Weather Data"/>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</div>


<style>
  * {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  :global(body) {
    background-color: hsl(200 0% 12%);
    color: hsl(200 0% 70%);
  }

  .container {
    margin: 0 auto;
    max-width: 600px;
  }

  .weather_container {
    aspect-ratio: 2/1;
    background-color: hsl(200 0% 14%);
  }
</style>