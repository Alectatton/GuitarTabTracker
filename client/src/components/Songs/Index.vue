<template>
    <v-container>
        <v-flex>
            <songs-bookmarks />
        </v-flex>
        <v-flex>
            <songs-search-panel />
            <songs-panel />     
        </v-flex>
    </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongsPanel from './SongsPanel.vue'
import SongsSearchPanel from './SongsSearchPanel.vue'
import SongsBookmarks from './SongsBookmarks.vue'

export default {
    components: {
        SongsPanel,
        SongsSearchPanel,
        SongsBookmarks,
    },
    data() {
        return {
            songs: null
        }
    },
    async mounted () {
        this.songs = (await SongsService.index()).data
    }
}
</script>

d" attribute to limit CSS to this component only -->
<style scoped>
.error {
    color: red
}

.song {
    padding: 20px;
    height: 330px;
    overflow: hidden;
}

.song-title {
    font-size: 30px;
}

.song-artist {
    font-size: 24px;
}

.song-genre {
    font-size: 18px;
}
.album-image {
    width: 60%;
    margin: 0 auto;
}
</style>
