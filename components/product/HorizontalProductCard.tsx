import type { Product } from "apps/commerce/types.ts";
import type { Platform } from "../../apps/site.ts";
import Image from "apps/website/components/Image.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { formatPrice } from "../../sdk/format.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";

export interface Props {
    product: Product;
    /** Largura máxima do card horizontal */
    maxWidthCard?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    animateImage?: boolean;

    /** Preload card image */
    preload?: boolean;

    /** @description used for analytics event */
    itemListName?: string;

    /** @description index of the product card in the list */
    index?: number;

    platform?: Platform;
}

export default function HorizontalProductCard({
    preload,
    product,
    platform,
    maxWidthCard,
    animateImage
}: Props) {
    const { url, productID, name, image: images, offers, isVariantOf } = product;
    const id = `product-card-${productID}`;
    const productName = isVariantOf?.name ?? name;
    const description = product.description || isVariantOf?.description;
    const [front] = images ?? [];
    const { listPrice, price} = useOffer(offers);

    const eventItem = mapProductToAnalyticsItem({
        product,
        price,
        listPrice,
    });

    const maxWidthCardValue = {
        1: "max-w-xl",
        2: "max-w-2xl",
        3: "max-w-3xl",
        4: "max-w-4xl",
        5: "max-w-5xl",
        6: "max-w-6xl",
        7: "max-w-7xl",
        8: "max-w-full"
      };

    return (
        <>
            <div class={`p-4 border-b border-b-blue-300 ${maxWidthCardValue[maxWidthCard ?? 3]}`} id={id}>
                <div class="flex flex-col md:flex-row justify-between items-start">
                    <div class="mb-4 max-w-48">
                        <a href={url} class="overflow-hidden max-w-44 max-h-32">
                            <Image
                                src={front.url!}
                                alt={front.alternateName}
                                width={185}
                                height={125}
                                class={`w-full ${!animateImage ? "transition duration-500 cursor-pointer object-cover" : "hover:scale-110 transition duration-500 cursor-pointer object-cover"}`}
                                preload={preload}
                                loading={preload ? "eager" : "lazy"}
                                decoding="async"
                            />
                        </a>
                    </div>
                    <div class="flex flex-col md:flex-row gap-4 ml-40 w-full justify-between">
                        <div className="flex flex-col">
                            <h5 class="text-lg">{productName}</h5>
                            <p class="text-xs">
                                {description}
                            </p>
                        </div>
                        <div class="">
                            <div class="flex flex-col items-center mb-1">
                                <span class="">
                                    de: <s>{formatPrice(listPrice, offers?.priceCurrency)}</s>
                                </span>
                                <h4 class="">
                                    por: {formatPrice(price, offers?.priceCurrency)}
                                </h4>
                            </div>

                            <div class="flex flex-col mt-4">
                                {platform === "vtex" && (
                                    <>
                                        <AddToCartButtonVTEX
                                            eventParams={{ items: [eventItem] }}
                                            productID={productID}
                                            seller={"1"}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}