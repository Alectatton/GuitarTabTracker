<template>
    <v-container>
        <v-app-bar fixed class="blue" dark> 
            <v-app-bar-title class="mr-4">
                <span
                    class="home"
                    @click="navigateTo({name: 'root'})">
                Tab Tracker
                </span>
            </v-app-bar-title>

            <!-- // TODO
                        <v-toolbar-items>
                            <v-btn class="cyan" flat dark>
                                Browse
                            </v-btn>
                        </v-toolbar-items> -->

            <v-spacer></v-spacer>

            <v-toolbar-items >
                <v-btn 
                    v-if="!$store.state.isUserLoggedIn"
                    class="blue" 
                    text 
                    dark
                    @click="navigateTo({name: 'login'})">
                     Login
                </v-btn>

                <v-btn 
                    v-if="!$store.state.isUserLoggedIn"
                    class="blue" 
                    text 
                    dark
                    @click="navigateTo({name: 'register'})">
                     Sign Up
                </v-btn>
            </v-toolbar-items>

        </v-app-bar>
    </v-container>
</template>

<script>
export default {
    methods: {
        navigateTo (route) {
            this.$router.push(route)
        }
    }
}
</script>

<style scoped>
.home {
    cursor: pointer;
}

.home:hover {
    color: lightblue;
}
</style>
