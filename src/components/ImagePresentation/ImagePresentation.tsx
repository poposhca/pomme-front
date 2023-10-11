import ImagePresentationItem from './types.ts';

const ImagePresentation = ({ image }: ImagePresentationItem) => (
    <>
        <img src={image} alt="presentation" />
    </>
);

export default ImagePresentation;
