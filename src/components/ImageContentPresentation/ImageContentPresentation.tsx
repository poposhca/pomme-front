import ImageContentPresentationItem from './types.ts';
import './styles.css';

const ImageContentPresentation = ({ image, content }: ImageContentPresentationItem) => (
    <div className={"container"}>
        <h2 className={"left"}>{content}</h2>
        <div className={"right"}>
            <img src={image} />
        </div>
    </div>
);

export default ImageContentPresentation;
