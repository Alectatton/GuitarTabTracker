<template>
    <v-container class="mt-12">
        <v-row>
            <v-spacer />
                <v-col  cols="6">
                    <v-card elevation="15" shaped>
                        <v-card-text>
                            <panel title="Register">
                                <div class="pl-4 pr-4 pt-2 pb-2">
                                    <form
                                        name="tab-tracker-form"
                                        autocomplete="off">
                                        <v-text-field 
                                            label="Email"
                                            v-model="email"
                                        ></v-text-field>
                                        <br>
                                        <v-text-field
                                            label="Password"
                                            v-model="password"
                                            type="password"
                                            autocomplete="new-password"
                                        ></v-text-field>
                                    </form>
                                    <br>
                                    <div class="danger-alert" v-html="error" />
                                    <br>
                                    <v-btn
                                        @click="register()"
                                        color="accent"
                                        elevation="9"
                                        rounded
                                        outlined>
                                        Register
                                    </v-btn>
                                </div>
                            </panel>
                        </v-card-text>
                    </v-card>
                </v-col>
            <v-spacer />
        </v-row>
    </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async register() {
            try{ 
                const response = await AuthenticationService.register({
                    email: this.email,
                    password: this.password
                })
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$router.push({
                    name: 'songs'
                })
            } catch (error) {
                this.error = error.response.data.error
            }
        }
    }
}
</script>

d" attribute to limit CSS to this component only -->
<style scoped>
</style>
