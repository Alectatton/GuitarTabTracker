<template>
    <div class="white elevation-2 pa-6 ma-1 mt-10">
        <v-toolbar>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <slot name="action"/>
        </v-toolbar>

        <div class="pl-2 pr-2 pt-2 pb-2">
            <slot>
                No Slot content defined
            </slot>                             
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'title'
    ]
}
</script>

<style scoped>
</style>