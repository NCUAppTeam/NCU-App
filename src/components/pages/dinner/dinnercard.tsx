
export function DinnerCard({ restaurant }: { restaurant: Event }) {

    return (
        <div className="flex-shrink-0 w-40 rounded-lg overflow-hidden text-white">
            <div className="h-32 bg-gray-500" />
            <div className="p-2 bg-white">
                <h3 className="text-lg mb-1 text-black">{ }</h3>

            </div>
        </div>
    );
}