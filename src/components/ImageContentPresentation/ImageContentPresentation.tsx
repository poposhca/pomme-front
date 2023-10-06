import './styles.css';

type props = {
    image: string;
    content: string;
};
const ImageContentPresentation = ({ image, content }: props) => (
    <div className={"container"}>
        <h2 className={"left"}>{content}</h2>
        <div className={"right"}>
            <img src={image} />
        </div>
    </div>
);

export default ImageContentPresentation;
