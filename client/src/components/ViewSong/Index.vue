<template>
    <div>
        <v-layout>
            <v-flex xs6>
                <song-metadata :song="song" />
            </v-flex>

            <v-flex xs6>
                <video-embed :youtubeId="song.youtubeId" />
            </v-flex>

        </v-layout>

        <v-layout>
            <v-flex xs6>
                <tab :song="song"/>
            </v-flex>

            <v-flex xs6>
                <lyrics :song="song"/>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongMetadata from './SongMetadata.vue'
import VideoEmbed from './VideoEmbed.vue'
import Lyrics from './Lyrics.vue'
import Tab from './Tab.vue'

export default {
    data () {
        return {
            song: {}
        }
    },
    async mounted () {
        const songId = this.$store.state.route.params.songId
        this.song = (await SongsService.show(songId)).data
    },
    components: {
        SongMetadata,
        VideoEmbed,
        Lyrics,
        Tab
    }
}
</script>

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

textarea {
    width: 100%;
    font-family: monospace;
    border: none;
    height: 600px;
    overflow: auto;
    padding: 30px;
}
</style>
