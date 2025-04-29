import Restaurant from "../../../backend/dinner/Entities/Restaurant";

export function DinnerDetail({
    restaurant,
    closeDetail,
}: {
    restaurant: Restaurant | null;
    closeDetail: () => void;
}) {
    return (
        <dialog
            id="dinner_detail_modal"
            className="modal"
            open={!!restaurant}
        >
            <div className="modal-box max-h-[80vh] overflow-y-auto relative">
                <form method="dialog">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={closeDetail}
                    >
                        ✕
                    </button>
                </form>
                {restaurant && (
                    <>
                        <h3 className="font-bold text-lg">{restaurant.restaurant}</h3>
                        <p className="py-2">
                            <strong>地址:</strong> {restaurant.address}
                        </p>
                        <p className="py-2">
                            <strong>營業時間:</strong> {restaurant.openhr}
                        </p>
                        <p className="py-2">
                            <strong>營業日:</strong> {restaurant.openday.join(", ")}
                        </p>
                        <p className="py-2">
                            <strong>分類:</strong> {restaurant.fk_category}
                        </p>
                        <img
                            className="w-full h-48 object-cover rounded-lg mt-4"
                            src={restaurant.image}
                            alt={restaurant.restaurant}
                        />
                    </>
                )}
            </div>
            <label
                className="modal-backdrop"
                htmlFor="dinner_detail_modal"
                onClick={closeDetail}
            >
                Close
            </label>
        </dialog>
    );
}
