<template>
    <v-container>
        <v-app-bar fixed class="blue" dark> 
            <v-app-bar-title class="mr-4">
                <router-link
                    tag="span"
                    class="home"
                    :to="{
                        name: 'register'
                    }">
                    Tab Tracker
                </router-link>
            </v-app-bar-title>


            <v-toolbar-items>
                <v-btn 
                    class="blue" 
                    text 
                    dark
                    :to="{
                        name: 'songs'
                    }">
                    Browse
                </v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-toolbar-items >
                <v-btn 
                    v-if="!$store.state.isUserLoggedIn"
                    class="blue" 
                    text 
                    dark
                    :to="{
                        name: 'login'
                    }">
                     Log in
                </v-btn>

                <v-btn 
                    v-if="!$store.state.isUserLoggedIn"
                    class="blue" 
                    text 
                    dark
                    :to="{
                        name: 'register'
                    }">
                     Sign Up
                </v-btn>

                <v-btn 
                    v-if="$store.state.isUserLoggedIn"
                    class="blue" 
                    text 
                    dark
                    @click="logout">
                     Log out
                </v-btn>

            </v-toolbar-items>

        </v-app-bar>
    </v-container>
</template>

<script>
export default {
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'songs'
            })
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
