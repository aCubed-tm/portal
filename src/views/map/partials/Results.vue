<style lang="scss">

.fontSmaller{
    font-size: 12px;
}
</style>

<template>
    <div class="card" style="width: 32rem;">
        <div id="searchResults" class="card-body">
            <button type="button" class="close" aria-label="Close"
                    @click="hideResult">
                <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="card-title">{{object.type}} information for
                <span class="font-weight-bold">{{object.name}}</span>
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Latest update at: 30/01/2020</h6>
            <br/><br/>
            <h5 class="font-weight-bold">Description</h5>
            <p class="fontSmaller">{{object.note}}</p>
            <hr/>
            <div class="row">
                <div class="col-4">
                    <button class="btn btn-primary">Get directions</button>
                </div>
                <div class="col-8 fontSmaller">
                    {{object.type}} {{object.name}} was located
                    {{object.timestamps[0].timestamp}} at
                    {{object.timestamps[0].location}}
                </div>
            </div>
            <hr/>
            <div>
                <h5 class="font-weight-bold">History</h5>
                <ul>
                    <li v-for="timestamp in object.timestamps" :key="timestamp.id">
                        {{timestamp.timestamp}}: {{timestamp.location}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'map-results',
    props: {
        object: {
            default: '',
        },
    },
    methods: {
        hideResult() {
            this.$emit('hide-result');
        },
    },
};
</script>
