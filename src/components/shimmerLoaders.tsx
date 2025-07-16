import ShimmerBlock from "./shimmerBlocks";

const ProfileShimmer = () => (
  <>
    <div className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded-lg p-6 mb-6">
      <ShimmerBlock height="h-7" width="w-1/3" />
      <ShimmerBlock height="h-6" width="w-3/3" />
    </div>
    <div className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded-lg p-6 mb-6">
      <ShimmerBlock height="h-8" width="w-1/3" />
      <ShimmerBlock height="h-6" width="w-3/3" />
    </div>
    <div className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded-lg p-6 mb-6">
      <ShimmerBlock height="h-7" width="w-1/3" />
      <ShimmerBlock height="h-6" width="w-3/3" />
    </div>
    <div className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded-lg p-6 mb-6">
      <ShimmerBlock height="h-7" width="w-1/3" />
      <ShimmerBlock height="h-6" width="w-3/3" />
    </div>
  </>
);
const ProductCardShimmer = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="border p-4 rounded-md w-full max-w-sm mx-auto bg-white shadow"
      >
        <ShimmerBlock height="h-40" className="mb-3" />
        <ShimmerBlock height="h-4" width="w-3/4" />
        <ShimmerBlock height="h-4" width="w-1/2" className="mt-2" />
      </div>
    ))}
  </div>
);

const ListItemShimmer = () => (
  <div className="flex items-center gap-4 p-2">
    <ShimmerBlock height="h-10" width="w-10" rounded="rounded-full" />
    <div className="flex-1 space-y-1">
      <ShimmerBlock width="w-2/3" />
      <ShimmerBlock width="w-1/3" />
    </div>
  </div>
);
const Shimmer = {
  Block: ShimmerBlock,
  Profile: ProfileShimmer,
  ProductCard: ProductCardShimmer,
  ListItem: ListItemShimmer,
};

export default Shimmer;
