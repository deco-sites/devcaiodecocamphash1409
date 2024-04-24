import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Image {
    image: ImageWidget;
}

export interface Props {
    images: Image[]
}

export default function PartialImageGallery({images}: Props) {
    return (
        <section class="flex flex-row gap-2">
            { images.length >= 3 && images.map((item) => {
                return (
                    <div>
                        <Image 
                            src={item.image}
                            width={300}
                            height={300}
                            loading={"lazy"}
                        />
                    </div>
                )
            })}
        </section>
    )
}