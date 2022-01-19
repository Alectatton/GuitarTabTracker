import Api from '@/services/Api'

export default {
    index (bookmark) {
        return Api().get('bookmarks', {
            params: bookmark
        })
    },
    retrieve (bookmark) {
        return Api().get('bookmark', {
            params: bookmark
        })
    },
    post (bookmark) {
        return Api().post('bookmarks', bookmark)
    },
    delete (bookmarkId) {
        console.log('delete')
        console.log(bookmarkId)
        return Api().delete(`bookmark/${bookmarkId}`)
    }
}
