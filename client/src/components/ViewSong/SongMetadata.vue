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
                    v-if="isUserLoggedIn && !bookmark"
                    color="accent"
                    elevation="9"
                    rounded
                    outlined
                    @click="setBookmark">
                    Bookmark Song
                </v-btn>

                <v-btn
                    v-if="isUserLoggedIn && bookmark"
                    color="accent"
                    elevation="9"
                    rounded
                    outlined
                    @click="unsetBookmark">
                    Remove Bookmark
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
            bookmark: null
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
        // {{ TODO }}
        // .index takes just user id and finds all, maybe new route for userId and songId to find just one?
        try {
            this.bookmark = (await BookmarksService.index({
                songId: this.$store.state.route.params.songId,
                userId: this.$store.state.user.id
            })).data
        } catch (e) {
            console.log(e)
        }
    },
    methods: {
        async setBookmark () {
            try {
                this.bookmark = (await BookmarksService.post({
                    songId: this.$store.state.route.params.songId,
                    userId: this.$store.state.user.id
                })).data 
            } catch (e) {
                console.log(e)
            }
        },
        async unsetBookmark () {
            try {
                console.log('Bookmark', this.bookmark)
                console.log('bookmark id ', this.bookmark.id)
                await BookmarksService.delete(this.bookmark.id)
                this.bookmark = null
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
