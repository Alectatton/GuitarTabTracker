<template>
    <panel title="Tab">
        <textarea
            readonly
            v-model="song.tab"
        ></textarea>
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
textarea {
    width: 100%;
    font-family: monospace;
    border: none;
    height: 600px;
    overflow: auto;
    padding: 30px;
}
</style>
