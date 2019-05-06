import Utils from '../utils'

export default class ArtistService {
    constructor(props) {
        this.endpoint = `${Utils.URL.BASE}/${Utils.URL.ARTIST}`
    }
}