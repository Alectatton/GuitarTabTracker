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
                @click="save"
                color="accent"
                elevation="9"
                rounded
                outlined>
                    Save changes
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'

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
        async save () {
            this.error = null
            const areAllFieldsFilled = Object
                .keys(this.song)
                .every(key => !!this.song[key])
            if (!areAllFieldsFilled) {
                this.error = 'Please fill in all required fields'
                return
            }

            const songId = this.$store.state.route.params.songId

            try {
                await SongsService.put(this.song)
                this.$router.push({
                    name: 'song',
                    params: {
                        songId: songId
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }
    },
    async mounted () {
        try {
            const songId = this.$store.state.route.params.songId
            this.song = (await SongsService.show(songId)).data
        } catch (err) {
            console.log(err)
        }
    },
    components: {
        Panel
    }
}
</script>

<style scoped>
</style>
