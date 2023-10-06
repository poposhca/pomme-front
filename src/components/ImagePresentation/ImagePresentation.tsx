type props = {
    image: string;
};

const ImagePresentation = ({ image }: props) => (
    <>
        <img src={image} alt="presentation" />
    </>
);

export default ImagePresentation;
