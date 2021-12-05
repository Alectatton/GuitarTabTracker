<template>
    <v-layout>
        <v-flex xs4>
            <panel title="Song Data">

                <v-text-field
                    label="Title"
                    v-model="song.title"
                    required
                    :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                    label="Artist"
                    v-model="song.artist"
                    required
                    :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                    label="Genre"
                    v-model="song.genre"
                    required
                    :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                    label="Album"
                    v-model="song.album"
                    required
                    :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                    label="Album Image URL"
                    v-model="song.albumImageUrl"
                    required
                    :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                    label="Youtube ID"
                    v-model="song.youtubeId"
                    required
                    :rules="[rules.required]"
                ></v-text-field>

            </panel>
        </v-flex>
            
        <v-flex xs8>
            <panel title="Tab">
                <v-textarea
                    label="Tab"
                    v-model="song.tab"
                    required
                    :rules="[rules.required]"
                ></v-textarea>
            
                <v-textarea
                    label="Lyrics"
                    v-model="song.lyrics"
                    required
                    :rules="[rules.required]"
                ></v-textarea>
            </panel>

            <div class="danger-alert" v-if="error">
                {{ error }}
            </div>

            <v-btn
                @click="create"
                color="accent"
                elevation="9"
                rounded
                outlined>
                    Create Song
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import SongService from '@/services/SongsService'

export default {
    data () {
        return {
            song: {
                title: null,
                artist: null,
                genre: null,
                album: null,
                albumImageUrl: null, 
                youtubeId: null,
                lyrics: null,   
                tab: null,
            },
            error: null,
            rules: {
                required: (value) => !!value || 'Required.'
            }
        }
    },
    methods: {
        async create () {
            const areAllFieldsFilled = Object
                .keys(this.song)
                .every(key => !!this.song[key])
            if (!areAllFieldsFilled) {
                this.error = 'Please fill in all required fields'
                return
            }

            try {
                await SongService.post(this.song)
                this.$router.push({
                    name: 'songs'
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style scoped>
</style>
