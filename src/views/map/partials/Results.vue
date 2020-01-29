<template>
    <div>
        <div id="searchResults" class="border p-3 rounded">
            <h1>Vehicle information for <span>{{vehicle.name}}</span></h1>
            <div class="subtitle">Latest update at: {{latest.time}}</div>
            <div>
                <h3 class="text-capitalize">description</h3>
                <p>{{vehicle.description}}</p>
            </div>
            <devider/>
            <div class="row">
                <div class="col-6">
                    <button class="btn btn-primary">Get directions</button>
                </div>
                <div class="col-6">
                    Vehicle {{vehicle.name}} was located
                    [now - vehicle.location.latest.time => to seconds]
                    seconds ago at {{latest.lat}} - {{latest.long}}
                </div>
            </div>
            <devider/>
            <div>
                <h3 class="text-capitalize">history</h3>
                <ul>
                    <li v-for="item in vehicle.locations.slice().reverse()" :key="item.id">
                        [00] seconds ago: {{item.lat}}, {{item.long}}
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import Devider from '@/components/Devider.vue';

export default {
    name: 'map-results',
    components: { Devider },
    data() {
        return {
            vehicle: {
                name: 'TRA12X235',
                description: 'lorem ipsum dolor sit amet,',
                locations: [
                    {
                    lat: '53.123456',
                    long: '4.234567',
                    time: '12:34:23-000',
                    },
                    {
                    lat: '53.8765',
                    long: '4.234567',
                    time: '12:34:24-000',
                    },
                ],
            },
        };
    },

    computed: {
        latest() {
            return this.vehicle.locations[this.vehicle.locations.length - 1];
            },
    },
};
</script>
