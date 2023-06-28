<script lang="ts">
  import Carousel from "./lib/Carousel.svelte";
  import { faker } from "@faker-js/faker";

</script>

<div>
  <h1>Carousel Component with Svelte</h1>
</div>

<h2>Unstyled</h2>

<Carousel>
  {#each Array(10) as _, i}
    <div style="width: 100%">
      <img src={faker.image.avatar() } alt="" width="50">
      <h2>{ faker.person.fullName() }</h2>
      <p>{faker.lorem.paragraph()}</p>
      <p>@{ faker.company.name() }</p>
    </div>
  {/each}
</Carousel>

<h2>Styled</h2>

<div class="custom_carousel">
  <Carousel --cr-button-bg-color="hsl(0 0% 95%)">
    {#each Array(10) as _, i}
      <div style="" class="item">
        <img src={faker.image.avatar() } alt="" width="100" style="flex-shrink: 0">
        <div>
          <h2>{ faker.person.fullName() }</h2>
          <p>{faker.lorem.paragraph()}</p>
          <p>@{ faker.company.name() }</p>
        </div>
      </div>
    {/each}
  </Carousel>
</div>

<style>

  * {
    box-sizing: border-box;
  }

  .item {
    font-family: monospace;
    width: 100%;
    display: flex;
    gap: 2rem;
    align-items: center;
    padding-inline: 4rem;
  }

  .custom_carousel {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>