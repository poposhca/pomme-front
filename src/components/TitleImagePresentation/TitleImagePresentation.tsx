import TitleImagePresentationItem from './types.ts';

const TitleImagePresentation = ({ title, image }: TitleImagePresentationItem) => (
    <>
        <h1>{title}</h1>
        <img src={image} />
    </>
);

export default TitleImagePresentation;
