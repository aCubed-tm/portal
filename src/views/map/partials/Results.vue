<style lang="scss">

.fontSmaller{
    font-size: 12px;
}
</style>

<template>
    <div class="card" style="width: 32rem;">
        <div id="searchResults" class="card-body">
            <h5 class="card-title">Vehicle information for <span class="font-weight-bold">{{vehicle.name}}</span></h5>
            <h6 class="card-subtitle mb-2 text-muted">Latest update at: {{latest.time}}</h6>
            <br/><br/>
            <h5 class="font-weight-bold">Description</h5>
            <p class="fontSmaller">{{vehicle.description}}</p>
            <hr/>
            <div class="row">
                <div class="col-4">
                    <button class="btn btn-primary"
                    @click="hideResult">Get directions</button>
                </div>
                <div class="col-8 fontSmaller">
                    Vehicle {{vehicle.name}} was located
                    [now - vehicle.location.latest.time => to seconds]
                    seconds ago at {{latest.lat}} - {{latest.long}}
                </div>
            </div>
            <hr/>
            <div>
                <h5 class="font-weight-bold">History</h5>
                <ul>
                    <li v-for="item in vehicle.locations.slice().reverse()" :key="item.id">
                        16 seconds ago: {{item.lat}}, {{item.long}}
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'map-results',
    data() {
        return {
            vehicle: {
                name: 'TRA12X235',
                // eslint-disable-next-line max-len
                description: 'Er zijn vele variaties van passages van Lorem Ipsum beschikbaar maar het merendeel heeft te lijden gehad van wijzigingen in een of andere vorm, door ingevoegde humor of willekeurig gekozen woorden die nog niet half geloofwaardig ogen. ',
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
    props: {
        id: {
        default: '',
        },
    },
    methods: {
        hideResult() {
            this.$emit('hide-result');
        },
    },

    computed: {
        latest() {
            return this.vehicle.locations[this.vehicle.locations.length - 1];
            },
    },
};
</script>
