import Favorite, {DBFavorite} from "../Entities/Favorite";

const FavoriteService = {
    parseFavorite(record: DBFavorite): Favorite {
        const favorite = new Favorite();
        favorite.id = record.uuid;
        if (record.event_id) {
            favorite.event_id = record.event_id;
        }

        return favorite;
    }
}

export default FavoriteService;
