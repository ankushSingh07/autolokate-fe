import { DeliveryWhyBuy, HeroBanner, ProductsGrid, ValueProps, shopMetadata } from "./";

export const metadata = shopMetadata;

export default function ShopPage() {
  return (
    <main className="relative">
      <HeroBanner />
      <ProductsGrid />
      <ValueProps />
      <DeliveryWhyBuy />
    </main>
  );
}
