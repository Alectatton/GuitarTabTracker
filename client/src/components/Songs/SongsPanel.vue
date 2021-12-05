<template>
    <v-container class="mt-12">
        <panel title="Songs">
            <v-btn
                to="songs/create"
                slot="action" 
                medium
                absolute
                right
                middle>
                <v-icon>mdi-plus</v-icon>
            </v-btn>

            <div 
                v-for="song in songs"
                :key="song.id"
                class="song">

                <v-layout>
                    <v-flex xs6>
                        <div class="song-title">
                            {{song.title}}
                        </div>
                        <div class="song-artist">
                            {{song.artist}}
                        </div>
                        <div class="song-genre">
                            {{song.genre}}
                        </div>

                        <v-btn
                            color="accent"
                            elevation="9"
                            rounded
                            outlined
                            :to="{
                                name: 'song',
                                params: {
                                    songId: song.id
                                }
                            }"> 
                            View
                        </v-btn>
                    </v-flex>

                    <v-flex xs6>
                        <img class="album-image" :src="song.albumImageUrl" />
                    </v-flex>
                </v-layout>
            </div>
        </panel>
    </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
    data() {
        return {
            songs: null
        }
    },
    watch: {
        '$route.query.search': {
            immediate: true,
            async handler (value) {
                this.songs = (await SongsService.index(value)).data
            }
        }
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
