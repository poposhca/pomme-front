import PresentationSlide from "../models/PresentationSlide.ts";

type Props = {
    presentationItem: PresentationSlide
}

const Presentation = ({ presentationItem }: Props) => (
    <>
        <img src={presentationItem.url} />
    </>
);

export default Presentation;
