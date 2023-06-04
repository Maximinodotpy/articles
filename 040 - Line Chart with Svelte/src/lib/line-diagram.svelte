<script lang="ts">
    export let name : string = ''
    export let values : number[]

    // These values are arbitrarly chosen to fit the diagramm
    let height = 50;
    let width = 100;
    let padding = 5;
    
    $: highestValue = values.reduce((a, b) => Math.max(a, b))
    $: lowestValue = values.reduce((a, b) => Math.min(a, b))

    $: multiplier = ( height - 2 * padding ) / (highestValue - lowestValue);

    let path = ''
    $: {
        path = "M0 " + (height);
        for (let i = 0; i < values.length; i++) {
            let yValue = height - (((values[i] - lowestValue) * multiplier) + padding) ;
            
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
        viewBox={"0 0 " + width + " " + height}
        preserveAspectRatio="none"
        >
        <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                <stop stop-color="hsl(200 100% 50%)" offset="0%" />
                <stop stop-color="hsl(200 100% 20% / 0.2)" offset="100%"/>
            </linearGradient>
        </defs>
        
        <path d={path} class="line" fill="url(#gradient)"/>

        <!-- Show Labels -->
        <text x={width - 2.5} y={height - padding} class="label_text" text-anchor="end" dominant-baseline="middle">{ Math.round(lowestValue) }</text>
        <line x1={width - 2} y1={height - padding} x2={width} y2={height - padding} class="label_line"></line>
        
        <text x={width - 2.5} y={padding} class="label_text" text-anchor="end" dominant-baseline="middle">{ Math.round(highestValue) }</text>
        <line x1={width - 2} y1={padding} x2={width} y2={padding} class="label_line"></line>

        <text x="2" y={padding} class="title_text">{ name }</text>
    </svg>
</div>

<style lang="scss">
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