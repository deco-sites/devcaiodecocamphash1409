interface Props {
    couponCode: string;
    couponDescription: string;
}

export default function Cupom({couponCode, couponDescription}: Props) {
    return (
        <div class="flex flex-col gap-1 bg-amber-200 text-black text-center px-3">
            <b>
                { couponCode } 
            </b>
            <span>
                { couponDescription }
            </span>
        </div>
    )
}
 