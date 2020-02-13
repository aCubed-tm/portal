<style lang="scss">
.fontSmaller{
    font-size: 12px;
}

.fontBigger {
    font-size: 23px;
}

.colorHover{
    :hover i {
        color: #CF366D;
    }
}

.list-group-item {
    background-color: transparent !important;
}
</style>

<template>
    <div id="searchResults" class="card-body">
        <div class="colorHover" @click="hideResult">
            <button>
                <i class="fas fa-arrow-left"></i> Back
            </button>
        </div>
        <br/>
        <h5>{{object.type}} information for: </h5>
        <hr/>
        <div>
            <b class="fontBigger">{{object.name}}</b>
            <live-icon
                v-if="Math.abs(object.timestamps[0].timestamp.diff(time)) < 60000"
                class="live-icon">
            </live-icon>
            <i v-else class="fas fa-exclamation-circle pl-2 small text-black-50"></i>
        </div>
        <br/>
        <p class="fontSmaller">{{object.note}}</p>
        <br/>
        <p class="card-subtitle mb-2 text-muted">Last update:
            <br/> {{ latestDate }}
        </p>
        <br/>
        <div>
            <h5>History</h5>
            <ul class="list-group list-group-flush">
                <li v-for="timestamp in object.timestamps"
                :key="timestamp.id"
                class="list-group-item">
                    {{ moment(timestamp.timestamp).format('LLL') }}
                    <br/><span class="fontSmaller">located at: {{timestamp.x}} {{timestamp.y}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import LiveIcon from '@/components/LiveIcon.vue';

export default {
    name: 'map-results',
    components: { LiveIcon },
    computed: {
        latestDate() {
            return moment(this.object.timestamps[0].timestamp).format('LLL');
        },
    },
    props: {
        object: {
            default: '',
        },
    },
    methods: {
        moment(date) {
            return moment(date);
        },
        hideResult() {
            this.$emit('hide-result');
        },
    },
};
</script>
