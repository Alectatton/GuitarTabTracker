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
                    color="accent"
                    elevation="9"
                    rounded
                    outlined>
                    Edit Song
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
export default {
    props: [
        'song'
    ]
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
