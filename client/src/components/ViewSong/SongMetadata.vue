<template>
    <panel title="Song Info">
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
                    :to="{
                        name: 'song-edit',
                        params () {
                            return {
                                songId: song.id
                            }
                        }
                    }"
                    v-if="isUserLoggedIn"
                    color="accent"
                    elevation="9"
                    rounded
                    outlined>
                    Edit Song
                </v-btn>

                <v-btn
                    v-if="isUserLoggedIn && !isBookmarked"
                    color="accent"
                    elevation="9"
                    rounded
                    outlined
                    @click="bookmark">
                    Bookmark
                </v-btn>

                <v-btn
                    v-if="isUserLoggedIn  && isBookmarked"
                    color="accent"
                    elevation="9"
                    rounded
                    outlined
                    @click="unbookmark">
                    Unbookmark
                </v-btn>

            </v-flex>

            <v-flex xs6>
                <img class="album-image" :src="song.albumImageUrl" />
                    <br>
                    {{song.album}}
            </v-flex>
        </v-layout>
    </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
    props: [
        'song'
    ],
    data () {
        return {
            isBookmarked: false
        }
    },
    computed: {
        ...mapState([
            'isUserLoggedIn'
        ])
    },
    
    async mounted () {
        if (!this.isUserLoggedIn) {
            return
        }

        try {
            const bookmark = (await BookmarksService.index({
                songId: this.$store.state.route.params.songId,
                userId: this.$store.state.user.id
            })).data
            
            this.isBookmarked = !!bookmark
        } catch (e) {
            console.log(e)
        }
    },
    methods: {
        async bookmark () {
            try {
                await BookmarksService.post({
                    songId: this.$store.state.route.params.songId,
                    userId: this.$store.state.user.id
                }) 
            } catch (e) {
                console.log(e)
            }
        },
        async unbookmark () {
            try {
                await BookmarksService.delete({
                    songId: this.$store.state.route.params.songId,
                    userId: this.$store.state.user.id
                }) 
            } catch (e) {
                console.log(e)
            }
        }
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
