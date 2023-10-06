type props = {
    title: string;
    image: string;
};
const TitleImagePresentation = ({ title, image }: props) => (
    <>
        <h1>{title}</h1>
        <img src={image} />
    </>
);

export default TitleImagePresentation;
