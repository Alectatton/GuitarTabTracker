<template>
    <v-container class="mt-12">
        <v-row>
            <v-spacer />
                <v-col  cols="6">
                    <v-card elevation="15" shaped>
                        <v-card-text>
                            <panel title="Login">
                                <div class="pl-4 pr-4 pt-2 pb-2">
                                    <v-text-field 
                                        label="Email"
                                        v-model="email"
                                    ></v-text-field>
                                    <br>
                                    <v-text-field
                                        label="Password"
                                        v-model="password"
                                        type="password"
                                    ></v-text-field>
                                    <br>
                                    <div class="error" v-html="error" />
                                    <br>
                                    <v-btn
                                        @click="login()"
                                        color="accent"
                                        elevation="9"
                                        rounded
                                        outlined>
                                        Login
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
import Panel from '@/components/Panel'

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async login() {
            try{ 
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                })
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
            } catch (error) {
                this.error = error.response.data.error
            }
        }
    },
    components: {
        Panel
    }
}
</script>

d" attribute to limit CSS to this component only -->
<style scoped>
.error {
    color: red
}
</style>
