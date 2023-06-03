<script lang="ts">
    export let name : string = ''
    export let values : number[]

    let height = 50;
    let width = 100;
    
    let highestValue = values.reduce((a, b) => Math.max(a, b))
    let lowestValue = values.reduce((a, b) => Math.min(a, b))

    let multiplier = 40 / (highestValue - lowestValue);

    let path = ''
    $: {
        console.log('Value Changed ', values);
        
        path = "M0 " + (height);
        for (let i = 0; i < values.length; i++) {
            let yValue = height - (((values[i] - lowestValue) * multiplier) + 5) ;
            
            let xValue = i / (values.length - 1) * width;
            
            path += " L " + xValue + " " + yValue;
        }
        path += " L" + width + " " + height;
        path += " L 0 " + height;
        path += " Z";
    }
</script>

<div class="container">
    <svg 
        class="diagramm_svg"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        >

        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop stop-color="hsl(200 100% 50%)" offset="0%" />
            <stop stop-color="hsl(200 100% 20% / 0.2)" offset="100%"/>
        </linearGradient>
        <path d={path} class="line" fill="url(#gradient)"/>

        <!-- Show Labels -->
        <text x={width - 2.5} y="45" class="label_text" text-anchor="end" dominant-baseline="middle">{ Math.round(lowestValue) }</text>
        <line x1={width - 2} y1="45" x2={width} y2="45" class="label_line"></line>
        
        <text x={width - 2.5} y="5" class="label_text" text-anchor="end" dominant-baseline="middle">{ Math.round(highestValue) }</text>
        <line x1={width - 2} y1="5" x2={width} y2="5" class="label_line"></line>

        <text x="2" y="5" class="title_text">{ name }</text>
    </svg>

    <!-- <pre>{ JSON.stringify(values, null, '    ') }</pre> -->
</div>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    .container {
        background-color: hsl(200 50% 20%);
        background: linear-gradient(150deg, hsl(200 50% 20%), hsl(200 50% 10%));
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .diagramm_svg {
            width: 100%;
            height: 100%;

            .label_line {
                stroke-width: 0.3px;
                stroke: hsl(200 0% 100% / 0.3);
            }

            .title_text {
                font-size: 3px;
                fill: white;
                font-weight: 600;
            }

            .label_text {
                font-size: 2px;
                fill: white;
                text-align: right;
            }
        }
    }
</style>