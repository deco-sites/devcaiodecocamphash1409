export interface Props {
    text?: string;
}

export default function OnLineText({text}: Props) {
    return (
        <section class="flex items-center justify-center">
            <h3 class="text-center text-2xl max-w-80">{text}</h3>
        </section>
    )
}