import { Temperature } from "apps/weather/loaders/temperature.ts";

export interface Props {
    temperature?: Temperature | null;
}

export default function Weather({temperature}: Props) {
    return (
        <>
            <h2 class="text-center text-xl bg-[#0077b9] mb-4">Em Alagoas está fazendo {temperature?.celsius} graus</h2>
        </>
    )
}